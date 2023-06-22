import Axios from "axios";

function returnAxiosInstance() {
  return Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
}

export function get(url: string) {
  const axios = returnAxiosInstance();
  return axios.get(url);
}

export function post(url: string, requestData: any, headers?: any) {
  const axios = returnAxiosInstance();
  return axios.post(url, requestData, headers);
}

export function patch(url: string, requestData: any, headers?: any) {
  const axios = returnAxiosInstance();
  return axios.patch(url, requestData, headers);
}

export function remove(url: string) {
  const axios = returnAxiosInstance();
  return axios.delete(url);
}
