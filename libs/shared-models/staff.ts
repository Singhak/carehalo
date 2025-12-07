export interface Staff {
  id: string;
  userId: string; // Firebase Auth UID
  firstName: string;
  middleName?: string;
  lastName?: string;
  role: 'doctor' | 'nurse' | 'admin';
  hospitalId: string;
  degree?: string;
  timing?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}
