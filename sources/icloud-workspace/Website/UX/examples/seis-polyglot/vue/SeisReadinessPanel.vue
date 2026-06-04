<template>
  <section class="seis-readiness-panel" :data-status="status">
    <p>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <strong>{{ status }}</strong>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: "SEIS readiness" },
  title: { type: String, default: "Connector mesh is visible before activation." },
  status: { type: String, default: "watch" }
});
</script>
