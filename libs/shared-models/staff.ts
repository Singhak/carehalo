export interface Staff {
  id: string;
  userId: string; // Firebase Auth UID
  name: string;
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
