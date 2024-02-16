import { ServiceYear, ServiceYearDiscounts } from "../types";

const discounts: Readonly<ServiceYearDiscounts> = {
    2020: [
      {
        discountedServicesPackage: ["VideoRecording", "Photography"],
        discount: 1200,
      },
      {
        discountedServicesPackage: ["WeddingSession"],
        discount: 300,
        anyServicesRequiredForDiscount: ["Photography", "VideoRecording"],
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
        anyServicesRequiredForDiscount: ["Photography", "VideoRecording"],
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
        anyServicesRequiredForDiscount: ["VideoRecording"],
      },
      {
        discountedServicesPackage: ["WeddingSession"],
        discount: 600,
        anyServicesRequiredForDiscount: ["Photography"],
      },
    ],
  };

  export const getDiscounts = (year: ServiceYear) => discounts[year];