export type ReadinessStatus = "ready" | "ready-with-blocker" | "blocked";

export interface PolyglotReadinessSignal {
  readonly ok: boolean;
  readonly status: ReadinessStatus;
  readonly languageCount: number;
  readonly blocker?: string;
}

export function createPolyglotSignal(languageCount: number, remoteBlocked: boolean): PolyglotReadinessSignal {
  return {
    ok: languageCount >= 12,
    status: remoteBlocked ? "ready-with-blocker" : "ready",
    languageCount,
    blocker: remoteBlocked ? "github-auth" : undefined
  };
}
