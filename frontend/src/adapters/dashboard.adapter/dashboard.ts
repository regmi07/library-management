import { get } from "../xhr";

export const getDashboardCardDetails = () => {
  return get("dashboard");
};

export const getIssueStats = () => {
  return get("dashboard/weekly-issue");
};
