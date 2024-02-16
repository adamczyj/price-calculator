import { getServiceConfig } from "../config/services";
import { ServiceType } from "../types";

export const selectService = (
  previouslySelectedServices: ServiceType[],
  service: ServiceType
) => {
  if (previouslySelectedServices.includes(service)) {
    return previouslySelectedServices;
  }

  const anyRequiredServices = getServiceConfig(service)?.anyRequiredServices;
  if (
    !anyRequiredServiceSelected(anyRequiredServices, previouslySelectedServices)
  ) {
    return previouslySelectedServices;
  }

  return [...previouslySelectedServices, service];
};

const anyRequiredServiceSelected = (
  anyRequiredServices: ServiceType[],
  selectedServices: ServiceType[]
) => {
  if (!anyRequiredServices?.length) {
    return true;
  }

  return anyRequiredServices.some((requiredService) =>
    selectedServices.includes(requiredService)
  );
};
