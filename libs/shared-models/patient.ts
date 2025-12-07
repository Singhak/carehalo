export interface Patient {
  id: string;
  tenantId: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
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