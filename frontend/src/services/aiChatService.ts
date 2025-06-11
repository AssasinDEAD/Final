import axiosInstance from "../api/axiosInstance";

export const sendMessageToAI = async (message: string) => {
  const { data } = await axiosInstance.post("/aiChat", { message });
  return data;
};
