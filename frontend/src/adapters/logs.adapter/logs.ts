import { get } from "../xhr";

interface LogType {
  limit?: number;
  skip?: number;
  date?: string;
  status?: boolean;
}

export const getAllLogs = (params: LogType) => {
  let url = "logs?";
  if (params.date) url += `date=${params.date}`;
  if (params.status) url += `status=${params.status}`;
  if (params.limit) url += `limit=${params.limit}`;
  if (params.skip) url += `skip=${params.skip}`;

  return get(url);
};
