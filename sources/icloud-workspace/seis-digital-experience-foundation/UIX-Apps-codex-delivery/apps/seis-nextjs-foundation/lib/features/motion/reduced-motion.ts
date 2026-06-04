export function prefersReducedMotionFromHeader(header: string | null): boolean {
  if (!header) return false;
  return header.toLowerCase().includes("reduce");
}

export function getSafeMotionDuration(prefersReducedMotion: boolean, normal: number): number {
  return prefersReducedMotion ? Math.min(0.12, normal) : normal;
}
