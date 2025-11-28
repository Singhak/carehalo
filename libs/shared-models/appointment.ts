export interface Appointment {
  id: string;
  patientId: string;
  staffId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  hospitalId: string;
}
