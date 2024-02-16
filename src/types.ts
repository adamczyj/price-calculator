export type Price = { basePrice: number; finalPrice: number };
export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

export type ServicePrice = Record<ServiceType, number>;
export type ServiceYearPrices = Record<ServiceYear, ServicePrice>;

export type ServiceConfig = {
  dependentServices?: ServiceType[];
  anyRequiredServices?: ServiceType[];
};
export type ServiceConfigs = Partial<Record<ServiceType, ServiceConfig>>;

export type DiscountType = "WeddingSession" | "PhotographyWithVideoRecording";
export type DiscountRule = {
  type: DiscountType;
  servicesPackage: ServiceType[];
  discount: number;
};
export type ServiceYearDiscounts = Partial<Record<ServiceYear, DiscountRule[]>>;
export type ServicesPackageDiscounts = Partial<Record<DiscountType, number>>;
