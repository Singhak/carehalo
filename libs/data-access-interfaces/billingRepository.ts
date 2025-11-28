import { Billing } from '@cflock/shared-models';

export interface IBillingRepository {
  create(billing: Billing): Promise<Billing>;
  findById(id: string, hospitalId: string): Promise<Billing | null>;
  findAll(hospitalId: string, patientId?: string): Promise<Billing[]>;
  update(id: string, billing: Partial<Billing>): Promise<Billing>;
  delete(id: string, hospitalId: string): Promise<void>;
}
