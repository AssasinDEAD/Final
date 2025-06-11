import axiosInstance from "../api/axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data; 
};
