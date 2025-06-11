export interface Contract {
  id?: string;
  filePath: string;
  status: 'draft' | 'signedByUser' | 'signedByEmployer' | 'signedByCC' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}
