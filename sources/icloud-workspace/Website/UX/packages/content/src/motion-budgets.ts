export type MotionBudgetStatus = "active" | "guarded";

export type MotionRuntimeBudget = {
  id: string;
  label: string;
  target: string;
  proof: string;
  status: MotionBudgetStatus;
};

export const motionRuntimeBudgets: MotionRuntimeBudget[] = [
  {
    id: "dpr-cap",
    label: "Device pixel ratio",
    target: "1.25 max desktop / 1.0 mobile",
    proof: "renderer.setPixelRatio(Math.min(...))",
    status: "active"
  },
  {
    id: "active-scenes",
    label: "Active scene count",
    target: "Viewport-active only",
    proof: "IntersectionObserver pauses the render loop",
    status: "active"
  },
  {
    id: "mobile-fallback",
    label: "Mobile fallback",
    target: "Reduced motion and low-power canvas fallback",
    proof: "prefers-reduced-motion and WebGL availability checks",
    status: "active"
  },
  {
    id: "idle-pause",
    label: "Idle pause",
    target: "No offscreen animation frames",
    proof: "requestAnimationFrame resumes only when visible",
    status: "guarded"
  }
];
