export type PerformanceSignal = {
  id: string;
  surface: string;
  metric: string;
  target: string;
  current: string;
  status: "healthy" | "watch" | "critical";
  action: string;
};

export type PerformanceTask = {
  id: string;
  title: string;
  priority: "p1" | "p2" | "p3";
  owner: string;
  status: "planned" | "active" | "done";
};

const performanceSignals: PerformanceSignal[] = [
  {
    id: "perf-initial-js",
    surface: "Initial JS payload",
    metric: "First load JS",
    target: "< 260KB",
    current: "~301KB",
    status: "watch",
    action: "Move low-frequency command widgets to lazy boundaries."
  },
  {
    id: "perf-lcp-home",
    surface: "Homepage rendering",
    metric: "LCP",
    target: "< 2.2s",
    current: "~2.0s",
    status: "healthy",
    action: "Maintain current hero and font loading strategy."
  },
  {
    id: "perf-api-fanout",
    surface: "Command signal aggregation",
    metric: "Aggregate API latency",
    target: "p95 < 350ms",
    current: "p95 ~372ms",
    status: "critical",
    action: "Cache cross-domain summary blocks and reduce duplicate polling windows."
  },
  {
    id: "perf-mobile-scroll",
    surface: "Mobile command pages",
    metric: "Scroll FPS",
    target: ">= 55 fps",
    current: "~53 fps",
    status: "watch",
    action: "Reduce card density and defer non-critical visual effects on mobile."
  }
];

const performanceTasks: PerformanceTask[] = [
  {
    id: "perf-task-aggregate-cache",
    title: "Introduce aggregate cache layer for readiness dashboards",
    priority: "p1",
    owner: "backend-ops",
    status: "active"
  },
  {
    id: "perf-task-route-splitting",
    title: "Split heavy command panels into deferred route islands",
    priority: "p1",
    owner: "frontend-performance",
    status: "planned"
  },
  {
    id: "perf-task-mobile-density",
    title: "Optimize mobile card density and section collapse strategy",
    priority: "p2",
    owner: "ux-engineering",
    status: "planned"
  },
  {
    id: "perf-task-budget-alert",
    title: "Automate performance budget alerts into ops feed",
    priority: "p3",
    owner: "qa",
    status: "planned"
  }
];

export function getPerformanceSignals(): PerformanceSignal[] {
  return performanceSignals;
}

export function getPerformanceTasks(): PerformanceTask[] {
  return performanceTasks;
}

export function getPerformanceCommandSummary() {
  return {
    totalSignals: performanceSignals.length,
    healthySignals: performanceSignals.filter((item) => item.status === "healthy").length,
    watchSignals: performanceSignals.filter((item) => item.status === "watch").length,
    criticalSignals: performanceSignals.filter((item) => item.status === "critical").length,
    tasks: performanceTasks.length,
    activeTasks: performanceTasks.filter((item) => item.status === "active").length,
    plannedTasks: performanceTasks.filter((item) => item.status === "planned").length
  };
}
