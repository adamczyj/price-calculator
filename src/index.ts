import { calculatePrice } from "./calculate-price/calculatePrice";
import { RequiredServicesMap, ServiceType } from "./types";

const ServicesConfig: RequiredServicesMap = {
  BlurayPackage: { requiredServices: ["VideoRecording"] },
  TwoDayEvent: { requiredServices: ["Photography", "VideoRecording"] },
  Photography: { dependentServices: ["TwoDayEvent"] },
  VideoRecording: { dependentServices: ["BlurayPackage", "TwoDayEvent"] },
};

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  const { type, service } = action;
  if (type === "Select") {
    if (previouslySelectedServices.includes(service)) {
      return previouslySelectedServices;
    }

    const requiredServices = ServicesConfig[service]?.requiredServices;
    if (
      requiredServices &&
      requiredServices.every(
        (requiredService) =>
          !previouslySelectedServices.includes(requiredService)
      )
    ) {
      return previouslySelectedServices;
    }

    return [...previouslySelectedServices, service];
  }

  if (type === "Deselect") {
    if (!previouslySelectedServices.includes(service)) {
      return previouslySelectedServices;
    }

    const dependentServices = ServicesConfig[service]?.dependentServices;

    if (dependentServices) {
      const servicesToDeselect = [service];
      for (const relatedService of dependentServices) {
        const dependantServiceConfig = ServicesConfig[relatedService];
        if (!dependantServiceConfig?.requiredServices) {
          continue;
        }
        const anyRequiredServiceSelected = previouslySelectedServices.some(
          (s) =>
            s !== service && dependantServiceConfig.requiredServices.includes(s)
        );

        if (!anyRequiredServiceSelected) {
          servicesToDeselect.push(relatedService);
        }
      }

      return previouslySelectedServices.filter(
        (s) => !servicesToDeselect.includes(s)
      );
    }

    return previouslySelectedServices.filter((s) => s !== service);
  }
};

export { calculatePrice };