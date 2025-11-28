export interface Prescription {
  id: string;
  patientId: string;
  staffId: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
  hospitalId: string;
}
