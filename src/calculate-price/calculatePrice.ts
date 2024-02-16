import { getDiscounts as getDiscountsPerYear } from "../config/discounts";
import { getPrices as getPricesPerYear } from "../config/prices";
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

  const prices = getPricesPerYear(selectedYear);
  const basePrice = calculateBasePrice(selectedServices, prices);

  const discountsRules = getDiscountsPerYear(selectedYear);
  const discount = calculateDiscount(selectedServices, discountsRules);
  const finalPrice = basePrice - discount;

  return { basePrice, finalPrice };
};

