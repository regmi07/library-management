import { get } from "../xhr";

export const getDashboardCardDetails = () => {
  return get("dashboard");
};
