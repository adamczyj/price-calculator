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

type RequiredServicesMap = Partial<Record<ServiceType, ServiceConfig>>;

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

export type ServicePrice = Record<ServiceType, number>;
export type ServiceYearPrices = Record<ServiceYear, ServicePrice>;

export type DiscountRule = {
  discountedServicesPackage: ServiceType[];
  discount: number;
  requiredForDiscount?: ServiceType[];
};
export type ServiceDiscountRules = Partial<Record<ServiceType, number>>;
export type ServiceYearDiscounts = Partial<Record<ServiceYear, DiscountRule[]>>;

const prices: ServiceYearPrices = {
  2020: {
    Photography: 1700,
    VideoRecording: 1700,
    BlurayPackage: 300,
    TwoDayEvent: 400,
    WeddingSession: 600,
  },
  2021: {
    Photography: 1800,
    VideoRecording: 1800,
    BlurayPackage: 300,
    TwoDayEvent: 400,
    WeddingSession: 600,
  },
  2022: {
    Photography: 1900,
    VideoRecording: 1900,
    BlurayPackage: 300,
    TwoDayEvent: 400,
    WeddingSession: 600,
  },
};

const discounts: ServiceYearDiscounts = {
  2020: [
    {
      discountedServicesPackage: ["VideoRecording", "Photography"],
      discount: 1200,
    },
    {
      discountedServicesPackage: ["WeddingSession"],
      discount: 300,
      requiredForDiscount: ["Photography", "VideoRecording"],
    },
  ],
  2021: [
    {
      discountedServicesPackage: ["Photography", "VideoRecording"],
      discount: 1300,
    },
    {
      discountedServicesPackage: ["WeddingSession"],
      discount: 300,
      requiredForDiscount: ["Photography", "VideoRecording"],
    },
  ],
  2022: [
    {
      discountedServicesPackage: ["Photography", "VideoRecording"],
      discount: 1300,
    },
    {
      discountedServicesPackage: ["WeddingSession"],
      discount: 300,
      requiredForDiscount: ["VideoRecording"],
    },
    {
      discountedServicesPackage: ["WeddingSession"],
      discount: 600,
      requiredForDiscount: ["Photography"],
    },
  ],
};

type Price = { basePrice: number; finalPrice: number };

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
): Price => {
  if (!selectedServices.length) {
    return { basePrice: 0, finalPrice: 0 };
  }
  const basePrice = calculateBasePrice(selectedServices, prices[selectedYear]);
  const discount = calculateDiscount(selectedServices, discounts[selectedYear]);
  const finalPrice = basePrice - discount;

  return { basePrice, finalPrice };
};

export const calculateBasePrice = (
  selectedServices: ServiceType[],
  servicePrices: ServicePrice
) => {
  return selectedServices.reduce(
    (sum: number, service: ServiceType) => sum + servicePrices[service],
    0
  );
};

const calculateDiscount = (
  selectedServices: ServiceType[],
  discountRules: DiscountRule[]
) => {
  const servicesPackagesDiscount: Map<string, number> = new Map();
  for (let discountRule of discountRules) {
    const allDiscountedServicesSelected =
      discountRule.discountedServicesPackage.every((x) =>
        selectedServices.includes(x)
      );

    const anyRequiredServiceSelected =
      !discountRule.requiredForDiscount?.length ||
      discountRule.requiredForDiscount.some((x) =>
        selectedServices.includes(x)
      );

    if (allDiscountedServicesSelected && anyRequiredServiceSelected) {
      const discountedServicesKey = discountRule.discountedServicesPackage
        .sort()
        .join("__");

      const discountForService =
        servicesPackagesDiscount.get(discountedServicesKey) ?? 0;
      if (discountRule.discount > discountForService) {
        servicesPackagesDiscount.set(
          discountedServicesKey,
          discountRule.discount
        );
      }
    }
  }

  let totalDiscount = 0;
  servicesPackagesDiscount.forEach((discount, key) => totalDiscount += discount);

  return totalDiscount;
};
