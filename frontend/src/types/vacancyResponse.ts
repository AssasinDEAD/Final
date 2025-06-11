import { Vacancy } from "./vacancy";
import { User } from "./user";

export type VacancyResponseStatus = "pending" | "accepted" | "rejected";

export interface VacancyResponse {
  id: string;
  coverLetter: string;
  status: VacancyResponseStatus;
  createdAt: string;
  updatedAt: string;
  User?: User;
  Vacancy?: Vacancy;
}
