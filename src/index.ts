export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

type RequiredServicesMap = Partial<Record<ServiceType, ServiceType[]>>;

const RequiredServices: RequiredServicesMap = {
  BlurayPackage: ["VideoRecording"],
  TwoDayEvent: ["Photography", "VideoRecording"],
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

    const requiredServices = RequiredServices[service];
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

    const requiredServices = RequiredServices[service];

    if (requiredServices) {
    }
    
    return previouslySelectedServices.filter((x) => x !== service);
  }
};

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => ({ basePrice: 0, finalPrice: 0 });
