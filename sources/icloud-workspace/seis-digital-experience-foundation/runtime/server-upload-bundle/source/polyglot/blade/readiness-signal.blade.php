{{-- ReadinessSignal: Blade Laravel template lane stays dependency-light. --}}
@php
  $ReadinessSignal = [
    'lane' => 'blade',
    'status' => 'reference',
    'score' => 105,
    'reducedMotionSafe' => true,
    'runtimeWeight' => 'dependency-light',
  ];
@endphp

<section
  data-readiness-signal="{{ $ReadinessSignal['lane'] }}"
  data-status="{{ $ReadinessSignal['status'] }}"
  data-score="{{ $ReadinessSignal['score'] }}"
  data-reduced-motion-safe="{{ $ReadinessSignal['reducedMotionSafe'] }}"
>
  polyglot-foundation
</section>
