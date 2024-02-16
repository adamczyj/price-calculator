import { RequiredServicesMap, ServiceType } from "../types";

const ServicesConfig: RequiredServicesMap = {
  BlurayPackage: { requiredServices: ["VideoRecording"] },
  TwoDayEvent: { requiredServices: ["Photography", "VideoRecording"] },
  Photography: { dependentServices: ["TwoDayEvent"] },
  VideoRecording: { dependentServices: ["BlurayPackage", "TwoDayEvent"] },
};

export const getServiceConfig = (service: ServiceType) => ServicesConfig[service];
