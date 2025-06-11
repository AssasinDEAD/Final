import axiosInstance from "../api/axiosInstance";
import { Notification } from "../types/notification";

const API_URL = "http://localhost:3000/notifications";

export const getNotifications = async (limit?: number): Promise<Notification[]> => {
  const url = limit ? `${API_URL}?limit=${limit}` : API_URL;
  const { data } = await axiosInstance.get(url); 
  return data;
};

export const getNotificationById = async (id: string): Promise<Notification> => {
  const { data } = await axiosInstance.get(`${API_URL}/${id}`);
  return data;
};

export const createNotification = async (formData: FormData): Promise<Notification> => {
  const { data } = await axiosInstance.post(API_URL, formData, { 
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateNotification = async (id: string, formData: FormData): Promise<Notification> => {
  const { data } = await axiosInstance.put(`${API_URL}/${id}`, formData, { 
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteNotification = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`); 
};
