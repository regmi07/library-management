import { get, patch } from "../xhr";

export const getSetting = () => {
  return get("settings");
};

export const updateSettings = (id: number, data: any) => {
  return patch(`settings/${id}`, data);
};

export const updateAvatar = (data: any) => {
  return patch("settings/profile", data, {
    "Content-Type": "multipart/form-data",
  });
};
