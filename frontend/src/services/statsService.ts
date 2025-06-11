import axiosInstance from "../api/axiosInstance";

export const fetchStats = async () => {
  const res = await axiosInstance.get("/stats/overview");
  return res.data;
};
