import axiosInstance from "../api/axiosInstance";  
import { Vacancy } from "../types/vacancy";

const API_URL = "http://localhost:3000/vacancies";

export const createVacancy = async (vacancy: Vacancy) => {
  const { data } = await axiosInstance.post(API_URL, vacancy); 
  return data;
};

export const updateVacancy = async (id: string, vacancy: Vacancy) => {
  const { data } = await axiosInstance.put(`${API_URL}/${id}`, vacancy); 
  return data;
};

export const deleteVacancy = async (id: string) => {
  await axiosInstance.delete(`${API_URL}/${id}`); 
};

export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const { data } = await axiosInstance.get(`${API_URL}/${id}`); 
  return data;
};

export const getMyVacancies = async (): Promise<Vacancy[]> => {
  const { data } = await axiosInstance.get(`${API_URL}/my`); 
  return data;
};

export const getAllVacancies = async (limit?:number): Promise<Vacancy[]> => {
  const url = limit ? `${API_URL}?limit=${limit}` : API_URL;
  const { data } = await axiosInstance.get(url);
  return data;
};