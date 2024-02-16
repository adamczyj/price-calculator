import { ServiceYear, ServiceYearDiscounts } from "../types";

const discounts: ServiceYearDiscounts = {
    2020: [
      {
        type: "PhotographyWithVideoRecording",
        servicesPackage: ["Photography", "VideoRecording"],
        discount: 1200,
      },
      {
        type: "WeddingSession",
        servicesPackage: ["WeddingSession", "VideoRecording"],
        discount: 300,
      },
      {
        type: "WeddingSession",
        servicesPackage: ["WeddingSession", "Photography"],
        discount: 300,
      },
    ],
    2021: [
      {
        type: "PhotographyWithVideoRecording",
        servicesPackage: ["Photography", "VideoRecording"],
        discount: 1300,
      },
      {
        type: "WeddingSession",
        servicesPackage: ["WeddingSession", "VideoRecording"],
        discount: 300,
      },
      {
        type: "WeddingSession",
        servicesPackage: ["WeddingSession", "Photography"],
        discount: 300,
      },
    ],
    2022: [
      {
        type: "PhotographyWithVideoRecording",
        servicesPackage: ["Photography", "VideoRecording"],
        discount: 1300,
      },
      {
        type: "WeddingSession",
        servicesPackage: ["WeddingSession", "VideoRecording"],
        discount: 300,
      },
      {
        type: "WeddingSession",
        servicesPackage: ["WeddingSession", "Photography"],
        discount: 600,
      },
    ],
  };

  export const getDiscounts = (year: ServiceYear) => discounts[year];