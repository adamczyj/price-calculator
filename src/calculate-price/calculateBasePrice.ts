import { ServicePrice, ServiceType } from "../types";

export const calculateBasePrice = (
  selectedServices: ServiceType[],
  servicePrices: ServicePrice
) => {
  return selectedServices.reduce(
    (sum: number, service: ServiceType) => sum + servicePrices[service],
    0
  );
};
