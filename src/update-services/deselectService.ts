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
    return deselectServiceWithDependencies(
      dependentServices,
      previouslySelectedServices,
      service
    );
  }

  return previouslySelectedServices.filter((s) => s !== service);
};

const deselectServiceWithDependencies = (
  dependentServices: ServiceType[],
  selectedServices: ServiceType[],
  deselectedService: ServiceType
) => {
  const dependentServicesToDeselect = getDependentServicesToDeselect(
    dependentServices,
    selectedServices,
    deselectedService
  );

  return selectedServices.filter(
    (s) => s !== deselectedService && !dependentServicesToDeselect.includes(s)
  );
};

const getDependentServicesToDeselect = (
  dependentServices: ServiceType[],
  selectedServices: ServiceType[],
  deselectedService: ServiceType
) => {
  const servicesToDeselect = [];
  for (const dependentService of dependentServices) {
    if (
      !anyRequiredServiceSelected(dependentService, selectedServices, deselectedService)
    ) {
      servicesToDeselect.push(dependentService);
    }
  }

  return servicesToDeselect;
};

const anyRequiredServiceSelected = (
  dependentService: ServiceType,
  selectedServices: ServiceType[],
  deselectedService: ServiceType
) => {
  const requiredServices = getServiceConfig(dependentService)?.anyRequiredServices;
  if (!requiredServices?.length) {
    return true;
  }

  // We need to remember that we are deselecting deselectedService so we need to ignore it here.
  return selectedServices.some(
    (s) => s !== deselectedService && requiredServices.includes(s)
  );
};
