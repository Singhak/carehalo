import { Appointment } from '@cflock/shared-models';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  findById(id: string, hospitalId: string): Promise<Appointment | null>;
  findAll(hospitalId: string): Promise<Appointment[]>;
  update(id: string, appointment: Partial<Appointment>, hospitalId: string): Promise<Appointment>;
  delete(id: string, hospitalId: string): Promise<void>;
}
