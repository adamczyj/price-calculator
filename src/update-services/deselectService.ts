import { getServiceConfig } from "../config/services";
import { ServiceType } from "../types";

export const deselectService = (
  previouslySelectedServices: ServiceType[],
  service: ServiceType
) => {
  if (!previouslySelectedServices.includes(service)) {
    return previouslySelectedServices;
  }

  const dependentServices = getServiceConfig(service)?.dependentServices;

  if (dependentServices) {
    const servicesToDeselect = getServicesToDeselect(
      dependentServices,
      previouslySelectedServices,
      service
    );
    return previouslySelectedServices.filter(
      (s) => !servicesToDeselect.includes(s)
    );
  }

  return previouslySelectedServices.filter((s) => s !== service);
};

const getServicesToDeselect = (
  dependentServices: ServiceType[],
  selectedServices: ServiceType[],
  service: ServiceType
) => {
  const servicesToDeselect = [service];
  for (const dependentService of dependentServices) {
    if (
      requiredServicesDeselected(dependentService, selectedServices, service)
    ) {
      servicesToDeselect.push(dependentService);
    }
  }

  return servicesToDeselect;
};

const requiredServicesDeselected = (
  dependentService: ServiceType,
  selectedServices: ServiceType[],
  service: ServiceType
) => {
  const requiredServices = getServiceConfig(dependentService)?.requiredServices;

  if (!requiredServices?.length) {
    return false;
  }

  const anyRequiredServiceSelected = selectedServices.some(
    (s) => s !== service && requiredServices.includes(s)
  );

  return !anyRequiredServiceSelected;
};
