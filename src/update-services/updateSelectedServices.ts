import { ServiceType } from "../types";
import { deselectService } from "./deselectService";
import { selectService } from "./selectService";

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  const { type, service } = action;
  if (type === "Select") {
    return selectService(previouslySelectedServices, service);
  }

  if (type === "Deselect") {
    return deselectService(previouslySelectedServices, service);
  }

  return previouslySelectedServices.filter((s) => s !== service);
};


