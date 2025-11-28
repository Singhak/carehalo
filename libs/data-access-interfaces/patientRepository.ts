import { Patient } from "@cflock/shared-models";

export interface IPatientRepository {
  create(tenantId: string, patient: Partial<Patient>): Promise<Patient>;
  getById(tenantId: string, id: string): Promise<Patient | null>;
  list(tenantId: string, page?: number, limit?: number): Promise<{ items: Patient[]; total: number }>;
  update(tenantId: string, id: string, patient: Partial<Patient>): Promise<Patient>;
}