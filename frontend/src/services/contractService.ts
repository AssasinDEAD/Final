import { Contract } from "../types/contract";
import { CompanyProfile } from "../types/companyProfile";

import axiosInstance from "../api/axiosInstance";

export const getContracts = async (): Promise<Contract[]> => {
  const res = await axiosInstance.get("/contracts");
  return res.data;
};

export const createContract = async (userData: Record<string, any>, companyId: string): Promise<Contract> => {
  const res = await axiosInstance.post("/contracts", { userData, companyId });
  return res.data;
};

export const deleteContract = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/contracts/${id}`);
};

export const downloadContract = (id: string): void => {
  const serverBaseUrl = "http://localhost:3000";
  window.open(`${serverBaseUrl}/contracts/${id}/download`, "_blank");
};

export const signContract = async (id: string, signature: string): Promise<Contract> => {
  const res = await axiosInstance.post(`/contracts/${id}/sign`, { signature });
  return res.data;
};

export const getAvailableCompanies = async (): Promise<CompanyProfile[]> => {
  const res = await axiosInstance.get("/com-profile/available");
  return res.data;
};
