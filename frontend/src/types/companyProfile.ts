export interface CompanyProfile {
  id: string;
  userId: string;
  companyName: string;
  address?: string;
  phone?: string;
  directorFullName?: string;
  canProvideInternship: boolean;
  BIN?: string;
  BIK?: string;
  KBE?: string;
  BANK?: string;
  representedBy?: string;
  basis?: string;
  createdAt: string;
  updatedAt: string;
}
