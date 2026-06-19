#!/usr/bin/env python3
"""Deterministic smoke test for the SEIS nano model (V16 §30).

Asserts the Phase 4 pipeline still works: loss decreases, checkpoint round-trips
losslessly, and training is deterministic for a fixed seed. Pure stdlib; fast
(<1s). Exit code 0 = pass, 1 = fail.
"""
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from nano_model import (  # noqa: E402
    Nano, build_vocab, load_ckpt, load_corpus, make_examples,
    model_from_ckpt, save_ckpt,
)


def train(xs, ys, vocab, seed, epochs, hidden=32, lr=0.5):
    rng = random.Random(seed)
    m = Nano(vocab, hidden, rng)
    first = None
    for _ in range(epochs):
        loss, grads = m.loss_and_grads(xs, ys)
        if first is None:
            first = loss
        m.step(grads, lr)
    final, _ = m.loss_and_grads(xs, ys)
    return m, first, final


def main():
    text = load_corpus(os.path.join(HERE, "corpus.txt"))
    chars, stoi, itos = build_vocab(text)
    xs, ys = make_examples(text, stoi)
    failures = []

    # 1) loss decreases meaningfully
    m, first, final = train(xs, ys, len(chars), seed=0, epochs=60)
    if not (final < first * 0.5):
        failures.append(f"loss did not decrease enough: {first:.4f} -> {final:.4f}")

    # 2) checkpoint round-trips losslessly
    ckpt = os.path.join(HERE, "runs", "smoke.json")
    save_ckpt(ckpt, m, {"epochs": 60})
    restored = model_from_ckpt(load_ckpt(ckpt))
    loss_before, _ = m.loss_and_grads(xs, ys)
    loss_after, _ = restored.loss_and_grads(xs, ys)
    if abs(loss_before - loss_after) > 1e-9:
        failures.append(f"checkpoint not lossless: {loss_before} != {loss_after}")

    # 3) deterministic for a fixed seed
    _, fa, la = train(xs, ys, len(chars), seed=7, epochs=40)
    _, fb, lb = train(xs, ys, len(chars), seed=7, epochs=40)
    if (fa, la) != (fb, lb):
        failures.append(f"non-deterministic: ({fa},{la}) != ({fb},{lb})")

    if failures:
        print("nano smoke test FAILED:")
        for f in failures:
            print(f"  - {f}")
        return 1
    print(f"nano smoke test passed (loss {first:.4f} -> {final:.4f}, checkpoint lossless, deterministic).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
