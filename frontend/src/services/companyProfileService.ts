import axios from "../api/axiosInstance";
import { CompanyProfile } from "../types/companyProfile";
import { User } from "../types/user";

export const getMyCompanyProfile = async (): Promise<CompanyProfile> => {
  const res = await axios.get("/com-profile/me");
  return res.data;
};

export const upsertCompanyProfile = async (data: Partial<CompanyProfile>): Promise<CompanyProfile> => {
  const res = await axios.put("/com-profile", data);
  return res.data.profile;
};

export const getAllCompanyProfiles = async (): Promise<User[]> => {
  const res = await axios.get("/com-profile");
  return res.data;
};

export const getCompanyProfileById = async (id: string): Promise<CompanyProfile> => {
  const res = await axios.get(`/com-profile/${id}`);
  return res.data;
};

export const deleteCompanyProfile = async (id: string): Promise<void> => {
  await axios.delete(`/com-profile/${id}`);
};
