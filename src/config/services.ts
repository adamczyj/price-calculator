import { ServiceConfigs, ServiceType } from "../types";

const servicesConfig: ServiceConfigs = {
  BlurayPackage: { anyRequiredServices: ["VideoRecording"] },
  TwoDayEvent: { anyRequiredServices: ["Photography", "VideoRecording"] },
  Photography: { dependentServices: ["TwoDayEvent"] },
  VideoRecording: { dependentServices: ["BlurayPackage", "TwoDayEvent"] },
};

export const getServiceConfig = (service: ServiceType) => servicesConfig[service];
