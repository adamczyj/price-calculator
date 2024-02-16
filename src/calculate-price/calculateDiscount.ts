import { DiscountRule, ServiceType } from "../types";

export const calculateDiscount = (
  selectedServices: ServiceType[],
  discountRules: DiscountRule[]
) => {
  const servicesPackagesDiscount: Map<string, number> = new Map();
  for (let discountRule of discountRules) {
    if (!discountCanBeApplied(discountRule, selectedServices)) {
      continue;
    }

    calculateDiscountForServicesPackage(discountRule, servicesPackagesDiscount);
  }

  return sumDiscounts(servicesPackagesDiscount);
};

const discountCanBeApplied = (
  discountRule: DiscountRule,
  selectedServices: ServiceType[]
) => {
  const allDiscountedServicesSelected =
    discountRule.discountedServicesPackage.every((x) =>
      selectedServices.includes(x)
    );

  if (!allDiscountedServicesSelected) {
    return false;
  }

  const anyRequiredServiceSelected =
    !discountRule.anyServicesRequiredForDiscount?.length ||
    discountRule.anyServicesRequiredForDiscount.some((x) => selectedServices.includes(x));

  return anyRequiredServiceSelected;
};

const getServicesPackageMapKey = (discountRule: DiscountRule) =>
  discountRule.discountedServicesPackage.sort().join("__");

const calculateDiscountForServicesPackage = (
  discountRule: DiscountRule,
  servicesPackagesDiscount: Map<string, number>
) => {
  const discountedServicesPackageKey = getServicesPackageMapKey(discountRule);
  const discountForServicePackage =
    servicesPackagesDiscount.get(discountedServicesPackageKey) ?? 0;

  if (discountRule.discount > discountForServicePackage) {
    servicesPackagesDiscount.set(
      discountedServicesPackageKey,
      discountRule.discount
    );
  }
};

const sumDiscounts = (discountsMap: Map<string, number>) => {
  let totalDiscount = 0;
  discountsMap.forEach((discount, _) => (totalDiscount += discount));

  return totalDiscount;
};