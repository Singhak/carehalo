export interface Patient {
  id: string;
  tenantId: string;
  fullName: string;
  dob?: string;
  phone?: string;
  email?: string;
  address?: string;
  medicalRecordNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}