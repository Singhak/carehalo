export interface Patient {
  id: string;
  tenantId: string;
  fullName: string;
  dob?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  medicalRecordNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}