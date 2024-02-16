import { Discounts } from "../config/discounts";
import { Prices } from "../config/prices";
import { Price, ServiceType, ServiceYear } from "../types";
import { calculateBasePrice } from "./calculateBasePrice";
import { calculateDiscount } from "./calculateDiscount";

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
): Price => {
  if (!selectedServices.length) {
    return { basePrice: 0, finalPrice: 0 };
  }
  const basePrice = calculateBasePrice(selectedServices, Prices[selectedYear]);
  const discount = calculateDiscount(selectedServices, Discounts[selectedYear]);
  const finalPrice = basePrice - discount;

  return { basePrice, finalPrice };
};

