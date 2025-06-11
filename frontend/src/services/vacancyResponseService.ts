import axiosInstance from "../api/axiosInstance";
import { VacancyResponse, VacancyResponseStatus } from "../types/vacancyResponse";

const API_URL = "/responses"; // относительный путь (лучше для продакшена)

export const createVacancyResponse = async (
  vacancyId: string,
  coverLetter: string
): Promise<VacancyResponse> => {
  const { data } = await axiosInstance.post(API_URL, { vacancyId, coverLetter });
  return data;
};

export const getMyVacancyResponses = async (): Promise<VacancyResponse[]> => {
  const { data } = await axiosInstance.get(`${API_URL}/my`);
  return data;
};

export const getResponsesByVacancy = async (vacancyId: string): Promise<VacancyResponse[]> => {
  const { data } = await axiosInstance.get(`${API_URL}/vacancy/${vacancyId}`);
  return data;
};

export const updateResponseStatus = async (
  responseId: string,
  status: VacancyResponseStatus
): Promise<VacancyResponse> => {
  const { data } = await axiosInstance.put(`${API_URL}/${responseId}/status`, { status });
  return data.response;
};

export const deleteResponse = async (responseId: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${responseId}`);
};
