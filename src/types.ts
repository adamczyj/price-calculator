export type Price = { basePrice: number; finalPrice: number };
export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

type ServiceConfig = {
  dependentServices?: ServiceType[];
  requiredServices?: ServiceType[];
};

export type RequiredServicesMap = Partial<Record<ServiceType, ServiceConfig>>;
export type ServicePrice = Record<ServiceType, number>;
export type ServiceYearPrices = Record<ServiceYear, ServicePrice>;

export type DiscountRule = {
  discountedServicesPackage: ServiceType[];
  discount: number;
  requiredForDiscount?: ServiceType[];
};
export type ServiceDiscountRules = Partial<Record<ServiceType, number>>;
export type ServiceYearDiscounts = Partial<Record<ServiceYear, DiscountRule[]>>;