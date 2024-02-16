import { getServiceConfig } from "../config/services";
import { ServiceType } from "../types";

export const selectService = (
  previouslySelectedServices: ServiceType[],
  service: ServiceType
) => {
  if (previouslySelectedServices.includes(service)) {
    return previouslySelectedServices;
  }

  const requiredServices = getServiceConfig(service)?.anyRequiredServices;
  if (
    !anyRequiredServiceSelected(requiredServices, previouslySelectedServices)
  ) {
    return previouslySelectedServices;
  }

  return [...previouslySelectedServices, service];
};

const anyRequiredServiceSelected = (
  requiredServices: ServiceType[],
  selectedServices: ServiceType[]
) => {
  if (!requiredServices?.length) {
    return true;
  }

  return requiredServices.some((requiredService) =>
    selectedServices.includes(requiredService)
  );
};
