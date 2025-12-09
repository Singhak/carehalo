import { Medication } from './medication';

export interface Prescription {
  id: string;
  patientId: string;
  staffId: string;
  hospitalId: string;
  medications: Medication[];
  date: string;
  isActive: boolean;
}
