import axiosInstance from "../api/axiosInstance"; 
import { Resume, ResumeWithUser, defaultResume } from "../types/resume";

const API_URL = "http://localhost:3000/resumes";

export const getResume = async (): Promise<Resume> => {
  try {
    const { data } = await axiosInstance.get<Resume>(`${API_URL}/me`);  
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) return defaultResume;
    throw err;
  }
};

export const updateResume = async (formData: Resume) => {
  await axiosInstance.put(API_URL, formData);  
};

export const fetchResumes = async (limit?:number): Promise<ResumeWithUser[]> => {
  const url = limit ? `${API_URL}?limit=${limit}` : API_URL;
  const { data } = await axiosInstance.get<ResumeWithUser[]>(url);  
  return data;
};

export const fetchResumeById = async (id: string): Promise<ResumeWithUser> => {
  const { data } = await axiosInstance.get<ResumeWithUser>(`${API_URL}/${id}`);  
  return data;
};
