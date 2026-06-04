<script setup>
const ReadinessSignal = {
  lane: "vue",
  status: "reference",
  score: 96,
  reducedMotionSafe: true,
  runtimeWeight: "dependency-light"
};
</script>

<template>
  <section
    :data-readiness-signal="ReadinessSignal.lane"
    :data-status="ReadinessSignal.status"
    :data-score="ReadinessSignal.score"
    :data-reduced-motion-safe="ReadinessSignal.reducedMotionSafe"
  >
    polyglot-foundation
  </section>
</template>
