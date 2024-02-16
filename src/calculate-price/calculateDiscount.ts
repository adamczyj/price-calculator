import { DiscountRule, ServiceType, ServicesPackageDiscounts } from "../types";

export const calculateDiscount = (
  selectedServices: ServiceType[],
  discountRules: DiscountRule[]
) => {
  const discounts: ServicesPackageDiscounts = {};
  for (let discountRule of discountRules) {
    if (!allServicesFromPackageSelected(discountRule, selectedServices)) {
      continue;
    }

    const discountForDiscountType =
      discounts[discountRule.type] ?? 0;

    if (discountRule.discount > discountForDiscountType) {
      discounts[discountRule.type] = discountRule.discount;
    }
  }

  return sumDiscounts(discounts);
};

const allServicesFromPackageSelected = (
  discountRule: DiscountRule,
  selectedServices: ServiceType[]
) => {
  return discountRule.servicesPackage.every((x) =>
    selectedServices.includes(x)
  );
};

const sumDiscounts = (discounts: ServicesPackageDiscounts) => {
  let totalDiscount = 0;
  for (let [_, discount] of Object.entries(discounts)) {
    totalDiscount += discount;
  }

  return totalDiscount;
};
