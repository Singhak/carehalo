import { Prescription } from '@cflock/shared-models';

export interface IPrescriptionRepository {
  create(prescription: Prescription): Promise<Prescription>;
  findById(id: string, hospitalId: string): Promise<Prescription | null>;
  findAll(hospitalId: string, patientId?: string): Promise<Prescription[]>;
  update(id: string, prescription: Partial<Prescription>): Promise<Prescription>;
  delete(id: string, hospitalId: string): Promise<void>;
}
