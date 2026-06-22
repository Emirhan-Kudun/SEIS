#!/usr/bin/env python3
"""SEIS Universe — nano research model (Phase 4, V16 §18).

An ORIGINAL, from-scratch, dependency-free (Python stdlib only) char-level
next-character model. Its only purpose is to prove the full training pipeline
end-to-end on the observed CPU sandbox before anything is scaled:

  tokenizer -> forward -> loss -> backprop -> optimizer -> checkpoint
  -> deterministic eval -> generation -> resumable training.

This is NOT a SEIS foundation model and has no real capability. It exists to
satisfy the Phase 4 gate honestly (V16 §16, §18, §19). No external data, no
network, no third-party code.

Usage:
  python3 nano_model.py train   --epochs 400 --out runs/ckpt.json
  python3 nano_model.py resume  --epochs 200 --out runs/ckpt.json
  python3 nano_model.py gen     --out runs/ckpt.json --length 80
"""
import argparse
import json
import math
import os
import random

# ---- char tokenizer (SEIS-owned, trivial) --------------------------------
CONTEXT = 3  # characters of context used to predict the next character


def load_corpus(path):
    with open(path, "r", encoding="utf-8") as fh:
        return fh.read()


def build_vocab(text):
    chars = sorted(set(text))
    stoi = {c: i for i, c in enumerate(chars)}
    itos = {i: c for c, i in stoi.items()}
    return chars, stoi, itos


def make_examples(text, stoi):
    # Left-pad with the first char so early positions still train.
    pad = text[0] * CONTEXT
    s = pad + text
    xs, ys = [], []
    for i in range(len(text)):
        ctx = s[i:i + CONTEXT]
        target = text[i]
        xs.append([stoi[c] for c in ctx])
        ys.append(stoi[target])
    return xs, ys


# ---- tiny linear-algebra helpers (lists of floats) -----------------------
def zeros(r, c):
    return [[0.0] * c for _ in range(r)]


def randmat(r, c, rng, scale):
    return [[(rng.random() * 2 - 1) * scale for _ in range(c)] for _ in range(r)]


def onehot_concat(ctx_ids, vocab):
    x = [0.0] * (CONTEXT * vocab)
    for pos, idx in enumerate(ctx_ids):
        x[pos * vocab + idx] = 1.0
    return x


def softmax(z):
    m = max(z)
    ex = [math.exp(v - m) for v in z]
    s = sum(ex)
    return [v / s for v in ex]


# ---- model ----------------------------------------------------------------
class Nano:
    def __init__(self, vocab, hidden, rng):
        self.V = vocab
        self.H = hidden
        self.D = CONTEXT * vocab
        self.W1 = randmat(self.D, hidden, rng, 0.2)
        self.b1 = [0.0] * hidden
        self.W2 = randmat(hidden, vocab, rng, 0.2)
        self.b2 = [0.0] * vocab

    def forward(self, x):
        z1 = self.b1[:]
        for i, xi in enumerate(x):
            if xi == 0.0:
                continue
            row = self.W1[i]
            for j in range(self.H):
                z1[j] += xi * row[j]
        h = [math.tanh(v) for v in z1]
        z2 = self.b2[:]
        for j in range(self.H):
            hj = h[j]
            row = self.W2[j]
            for k in range(self.V):
                z2[k] += hj * row[k]
        return h, softmax(z2)

    def loss_and_grads(self, xs, ys):
        gW1 = zeros(self.D, self.H)
        gb1 = [0.0] * self.H
        gW2 = zeros(self.H, self.V)
        gb2 = [0.0] * self.V
        total = 0.0
        n = len(xs)
        for ctx_ids, t in zip(xs, ys):
            x = onehot_concat(ctx_ids, self.V)
            h, p = self.forward(x)
            total += -math.log(max(p[t], 1e-12))
            dz2 = p[:]
            dz2[t] -= 1.0
            for j in range(self.H):
                hj = h[j]
                row = gW2[j]
                w2row = self.W2[j]
                dhj = 0.0
                for k in range(self.V):
                    row[k] += hj * dz2[k]
                    dhj += dz2[k] * w2row[k]
                dz1j = dhj * (1.0 - hj * hj)
                gb1[j] += dz1j
                # x is one-hot: only active context positions contribute
                for pos, idx in enumerate(ctx_ids):
                    gW1[pos * self.V + idx][j] += dz1j
            for k in range(self.V):
                gb2[k] += dz2[k]
        inv = 1.0 / n
        for r in gW1:
            for j in range(self.H):
                r[j] *= inv
        for j in range(self.H):
            gb1[j] *= inv
        for r in gW2:
            for k in range(self.V):
                r[k] *= inv
        for k in range(self.V):
            gb2[k] *= inv
        return total / n, (gW1, gb1, gW2, gb2)

    def step(self, grads, lr):
        gW1, gb1, gW2, gb2 = grads
        for i in range(self.D):
            wr, gr = self.W1[i], gW1[i]
            for j in range(self.H):
                wr[j] -= lr * gr[j]
        for j in range(self.H):
            self.b1[j] -= lr * gb1[j]
            wr, gr = self.W2[j], gW2[j]
            for k in range(self.V):
                wr[k] -= lr * gr[k]
        for k in range(self.V):
            self.b2[k] -= lr * gb2[k]


# ---- checkpointing --------------------------------------------------------
def save_ckpt(path, model, meta):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    blob = {
        "meta": meta,
        "context": CONTEXT,
        "V": model.V, "H": model.H,
        "W1": model.W1, "b1": model.b1, "W2": model.W2, "b2": model.b2,
    }
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(blob, fh)


def load_ckpt(path):
    with open(path, "r", encoding="utf-8") as fh:
        return json.load(fh)


def model_from_ckpt(blob):
    m = Nano(blob["V"], blob["H"], random.Random(0))
    m.W1, m.b1, m.W2, m.b2 = blob["W1"], blob["b1"], blob["W2"], blob["b2"]
    return m


# ---- generation -----------------------------------------------------------
def _temper(p, temperature, top_k):
    # Apply temperature, then optional top-k truncation, renormalising each time.
    if temperature and temperature > 0 and temperature != 1.0:
        logits = [math.log(max(pi, 1e-12)) / temperature for pi in p]
        m = max(logits)
        ex = [math.exp(l - m) for l in logits]
        s = sum(ex) or 1.0
        p = [e / s for e in ex]
    if top_k and 0 < top_k < len(p):
        keep = set(sorted(range(len(p)), key=lambda k: p[k], reverse=True)[:top_k])
        masked = [pi if k in keep else 0.0 for k, pi in enumerate(p)]
        s = sum(masked) or 1.0
        p = [mi / s for mi in masked]
    return p


def generate(model, stoi, itos, seed_text, length, rng, greedy=True, temperature=1.0, top_k=0):
    out = seed_text
    for _ in range(length):
        ctx = (out[-CONTEXT:] if len(out) >= CONTEXT else out[0] * (CONTEXT - len(out)) + out)
        ids = [stoi.get(c, 0) for c in ctx]
        _, p = model.forward(onehot_concat(ids, model.V))
        if greedy:
            nxt = max(range(len(p)), key=lambda k: p[k])
        else:
            probs = _temper(p, temperature, top_k)
            r, acc, nxt = rng.random(), 0.0, len(probs) - 1
            for k, pk in enumerate(probs):
                acc += pk
                if r <= acc:
                    nxt = k
                    break
        out += itos[nxt]
    return out


# ---- CLI ------------------------------------------------------------------
def run_train(args, resume=False):
    here = os.path.dirname(os.path.abspath(__file__))
    text = load_corpus(os.path.join(here, "corpus.txt"))
    chars, stoi, itos = build_vocab(text)
    xs, ys = make_examples(text, stoi)
    rng = random.Random(args.seed)

    if resume:
        blob = load_ckpt(args.out)
        model = model_from_ckpt(blob)
        start_epoch = blob["meta"].get("epochs", 0)
    else:
        model = Nano(len(chars), args.hidden, rng)
        start_epoch = 0

    first = None
    warm = max(1, args.epochs // 10)
    for e in range(args.epochs):
        loss, grads = model.loss_and_grads(xs, ys)
        if first is None:
            first = loss
        # Linear warmup then linear decay to 10% of base lr.
        if e < warm:
            lr_t = args.lr * (e + 1) / warm
        else:
            lr_t = args.lr * (1.0 - 0.9 * (e - warm) / max(1, args.epochs - warm))
        model.step(grads, lr_t)
        if e % max(1, args.epochs // 5) == 0 or e == args.epochs - 1:
            print(f"epoch {start_epoch + e:4d}  loss {loss:.4f}")
    final, _ = model.loss_and_grads(xs, ys)
    save_ckpt(args.out, model, {"epochs": start_epoch + args.epochs, "seed": args.seed})
    print(f"first_loss {first:.4f}  final_loss {final:.4f}  vocab {len(chars)}  examples {len(xs)}")
    print("sample: " + repr(generate(model, stoi, itos, text[:CONTEXT], 60, rng)))


def run_gen(args):
    here = os.path.dirname(os.path.abspath(__file__))
    text = load_corpus(os.path.join(here, "corpus.txt"))
    chars, stoi, itos = build_vocab(text)
    blob = load_ckpt(args.out)
    model = model_from_ckpt(blob)
    rng = random.Random(args.seed)
    greedy = args.temp <= 0
    print(generate(model, stoi, itos, text[:CONTEXT], args.length, rng,
                   greedy=greedy, temperature=args.temp or 1.0, top_k=args.topk))


def main():
    ap = argparse.ArgumentParser(description="SEIS nano research model")
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("train", "resume"):
        p = sub.add_parser(name)
        p.add_argument("--epochs", type=int, default=400)
        p.add_argument("--hidden", type=int, default=64)
        p.add_argument("--lr", type=float, default=0.5)
        p.add_argument("--seed", type=int, default=0)
        p.add_argument("--out", default="runs/ckpt.json")
    g = sub.add_parser("gen")
    g.add_argument("--out", default="runs/ckpt.json")
    g.add_argument("--length", type=int, default=80)
    g.add_argument("--seed", type=int, default=0)
    g.add_argument("--temp", type=float, default=0.0, help="0 = greedy; >0 = sampling temperature")
    g.add_argument("--topk", type=int, default=0, help="top-k truncation when sampling")
    args = ap.parse_args()
    if args.cmd == "train":
        run_train(args, resume=False)
    elif args.cmd == "resume":
        run_train(args, resume=True)
    else:
        run_gen(args)


if __name__ == "__main__":
    main()
