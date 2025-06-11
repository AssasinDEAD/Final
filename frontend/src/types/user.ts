import { CompanyProfile } from "./companyProfile";
import { Resume } from "./resume";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "company" | "career_center" | "admin";
  photo?: string;
  CompanyProfile?: CompanyProfile | null;
  Resume?: Resume | null;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  notifyUser: boolean;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateMePayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

