import { Staff } from '@cflock/shared-models';

export interface IStaffRepository {
  create(staff: Staff): Promise<Staff>;
  findById(id: string, hospitalId: string): Promise<Staff | null>;
  findByUserId(userId: string, hospitalId: string): Promise<Staff | null>;
  findAll(hospitalId: string): Promise<Staff[]>;
  update(id: string, staff: Partial<Staff>): Promise<Staff>;
  delete(id: string, hospitalId: string): Promise<void>;
}
