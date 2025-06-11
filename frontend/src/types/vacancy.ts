import { User } from "./user";

export interface Vacancy {
  id?: string;
  title: string;
  description: string;
  requirements: string[]; 
  location: string;
  salary: string;
  createdAt?: string;
  userId?: string;
  User?: User;
}
