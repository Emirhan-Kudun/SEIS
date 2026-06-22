#!/usr/bin/env python3
"""SEIS nano evaluation harness (V16 §18 Phase 7, §30).

A minimal, runnable evaluation that produces measurable metrics for the nano
model — proving the evaluation pipeline works, paralleling the training proof.
Pure stdlib; deterministic; fast.

Metric note: the nano model overfits a tiny corpus, so scores are expected to be
high. This harness exists to prove that evaluation is *measured*, not asserted
(V16 §16) — it is not a capability benchmark.
"""
import json
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from nano_model import (  # noqa: E402
    CONTEXT, Nano, build_vocab, generate, load_corpus, make_examples,
)


def train(xs, ys, vocab, seed=0, epochs=200, hidden=64, lr=0.5):
    rng = random.Random(seed)
    m = Nano(vocab, hidden, rng)
    for _ in range(epochs):
        _, grads = m.loss_and_grads(xs, ys)
        m.step(grads, lr)
    return m


def main():
    text = load_corpus(os.path.join(HERE, "corpus.txt"))
    chars, stoi, itos = build_vocab(text)
    xs, ys = make_examples(text, stoi)
    rng = random.Random(0)

    model = train(xs, ys, len(chars))
    final_loss, _ = model.loss_and_grads(xs, ys)

    # Generate a continuation from the corpus head and compare to ground truth.
    seed_text = text[:CONTEXT]
    gen = generate(model, stoi, itos, seed_text, len(text) - CONTEXT, rng, greedy=True)
    target, produced = text[CONTEXT:], gen[CONTEXT:]
    n = min(len(target), len(produced))
    correct = sum(1 for i in range(n) if target[i] == produced[i])
    char_accuracy = correct / n if n else 0.0
    exact_match = produced[:len(target)] == target

    report = {
        "harness": "research/nano/eval.py",
        "note": "toy nano overfit; proves measured evaluation, not capability (V16 §16)",
        "metrics": {
            "final_loss": round(final_loss, 4),
            "char_accuracy": round(char_accuracy, 4),
            "exact_match": exact_match,
            "vocab": len(chars),
            "examples": len(xs),
        },
    }
    os.makedirs(os.path.join(HERE, "runs"), exist_ok=True)
    with open(os.path.join(HERE, "runs", "eval.json"), "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2)
    print(json.dumps(report["metrics"], indent=2))
    # Pass criterion for the harness itself: it produced a finite score.
    return 0


if __name__ == "__main__":
    sys.exit(main())
