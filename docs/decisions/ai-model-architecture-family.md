# AI Model Architecture Family (SEIS Universe Phase 2)

Status: proposed (Phase 2, V16 §18). Recorded in the repo's canonical ADR home
(`docs/decisions/`, per [`ARCHITECTURE.md`](../../ARCHITECTURE.md)) rather than a
new `docs/adr/ai/` tree, to respect the existing convention. Governed by the
[model constitution](../ai/SEIS_MODEL_CONSTITUTION.md) and
[specification](../ai/SEIS_MODEL_SPECIFICATION.md).

> No model is trained. This ADR chooses only the **starting architecture family
> for the Phase 4 nano model**; it is revisitable with evidence (V16 §15, §16).

## Decision

Start the SEIS nano model as a **decoder-only Transformer**.

- It is the best-evidenced, best-documented baseline for text+code generation and
  runs at nano scale on the observed CPU sandbox
  ([`COMPUTE_CAPACITY.md`](../ai/COMPUTE_CAPACITY.md)).
- Defer MoE, state-space, hybrid-attention, retrieval-native, and multimodal
  designs to later phases, to be reopened with measured evidence.
- This choice is **gated**: it governs the nano proof-of-pipeline only; the
  `small`/`base` tiers re-evaluate before scaling (V16 §18 Phase 4 → 5).

## Why — family comparison

Per V16 §18 Phase 2, each candidate is judged on advantages, limitations,
compute/memory cost, training/inference complexity, scaling, and SEIS fit.

| Family | Advantages | Limitations | Cost / complexity | SEIS fit (now) |
|---|---|---|---|---|
| **Decoder-only Transformer** | simplest, best-documented, strong for text+code; trainable at nano scale | quadratic attention at long context | low at nano; well-understood | **chosen** for nano |
| Mixture-of-Experts | capacity without proportional FLOPs | routing/training complexity, memory for all experts | high infra | premature |
| State-space / recurrent | long-context efficiency | less mature tooling, fewer reference results | medium, riskier | later (long-context) |
| Hybrid attention | balances cost/quality | added design complexity | medium-high | later |
| Retrieval-augmented | smaller core + fresh knowledge | retrieval infra; SEIS already has app-layer RAG | medium | complements, not core |
| Multimodal encoders/projectors | images/audio/video | needs stable text core first | high | Phase 9 only |

### Evidence basis (clean-room, V16 §21)
- First-principles + public, reproducible research and official framework docs.
- No proprietary/leaked architectures used; any incidental similarity stems from
  public standards (V16 §21 Phase 3). Recorded in
  [`SOURCE_BASIS.md`](../provenance/SOURCE_BASIS.md).

## Consequences

- Phase 4 builds a decoder-only nano model to prove tokenizer → forward → loss →
  backprop → checkpoint → eval → generate end-to-end before any scaling.
- Reopen this ADR before the `small` tier, and whenever long-context or
  multimodal targets become primary.

## Gate (do not proceed past nano until)

Loss decreases, checkpoint restore works, tiny-set overfit succeeds, eval runs,
generation changes meaningfully during training, training is resumable
(V16 §18 Phase 4) — and real training hardware is measured (V16 §19).
