import { RequiredServicesMap, ServiceType } from "../types";

const servicesConfig: RequiredServicesMap = {
  BlurayPackage: { anyRequiredServices: ["VideoRecording"] },
  TwoDayEvent: { anyRequiredServices: ["Photography", "VideoRecording"] },
  Photography: { dependentServices: ["TwoDayEvent"] },
  VideoRecording: { dependentServices: ["BlurayPackage", "TwoDayEvent"] },
};

export const getServiceConfig = (service: ServiceType) => servicesConfig[service];
