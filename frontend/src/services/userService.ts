import axiosInstance from "../api/axiosInstance";
import { User, CreateUserPayload, UpdateUserPayload } from "../types/user";

export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  const response = await axiosInstance.post("/users/newUser", userData);
  return response.data.user;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const updateUser = async (id: string, userData: UpdateUserPayload): Promise<User> => {
  const response = await axiosInstance.put(`/users/${id}`, userData);
  return response.data.user;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};

export const updateMe = async (data: FormData) => {
  await axiosInstance.put("/users/me", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  }})
}
