import { ServicesConfig } from "../config/services";
import { ServiceType } from "../types";
import { selectService } from "./selectService";

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  const { type, service } = action;
  if (type === "Select") {
    return selectService(previouslySelectedServices, service);
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


