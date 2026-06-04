export type SeisPublishState = {
  githubHead: string;
  icloudBundle: string;
  cloudStatus: "ready" | "watch" | "blocked";
};

export function canRequestLiveDeploy(state: SeisPublishState): boolean {
  return Boolean(state.githubHead && state.icloudBundle && state.cloudStatus === "ready");
}
