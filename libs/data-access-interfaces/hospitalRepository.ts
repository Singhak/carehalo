
import { Hospital } from "@cflock/shared-models";

export interface IHospitalRepository {
  findById(id: string): Promise<Hospital | null>;
}
