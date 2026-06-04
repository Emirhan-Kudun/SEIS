export type MotionSceneMode = {
  id: "calm" | "editorial" | "cinematic" | "experimental";
  labelKey: string;
  intensityKey: string;
  purposeKey: string;
  constraintKey: string;
};

export const motionSceneModes: MotionSceneMode[] = [
  {
    id: "calm",
    labelKey: "motionModeCalmLabel",
    intensityKey: "motionModeCalmIntensity",
    purposeKey: "motionModeCalmPurpose",
    constraintKey: "motionModeCalmConstraint"
  },
  {
    id: "editorial",
    labelKey: "motionModeEditorialLabel",
    intensityKey: "motionModeEditorialIntensity",
    purposeKey: "motionModeEditorialPurpose",
    constraintKey: "motionModeEditorialConstraint"
  },
  {
    id: "cinematic",
    labelKey: "motionModeCinematicLabel",
    intensityKey: "motionModeCinematicIntensity",
    purposeKey: "motionModeCinematicPurpose",
    constraintKey: "motionModeCinematicConstraint"
  },
  {
    id: "experimental",
    labelKey: "motionModeExperimentalLabel",
    intensityKey: "motionModeExperimentalIntensity",
    purposeKey: "motionModeExperimentalPurpose",
    constraintKey: "motionModeExperimentalConstraint"
  }
];
