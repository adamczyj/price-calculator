import { ServiceYearDiscounts } from "../types";

export const Discounts: Readonly<ServiceYearDiscounts> = {
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