import { RequiredServicesMap } from "../types";

export const ServicesConfig: RequiredServicesMap = {
    BlurayPackage: { requiredServices: ["VideoRecording"] },
    TwoDayEvent: { requiredServices: ["Photography", "VideoRecording"] },
    Photography: { dependentServices: ["TwoDayEvent"] },
    VideoRecording: { dependentServices: ["BlurayPackage", "TwoDayEvent"] },
  };