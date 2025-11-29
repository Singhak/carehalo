
import { IPrescriptionRepository } from "@cflock/data-access-interfaces";
import { Prescription } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebasePrescriptionRepository implements IPrescriptionRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("prescriptions");

  async create(prescription: Prescription): Promise<Prescription> {
    // return dummy data
    return {
      ...prescription,
      id: "1",
    };
  }

  async findById(id: string, hospitalId: string): Promise<Prescription | null> {
    // return dummy data
    return {
      id: id,
      hospitalId: hospitalId,
      patientId: "1",
      staffId: "1",
      medication: "Dummy Medication",
      dosage: "10mg",
      frequency: "Once a day",
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  async findAll(hospitalId: string, patientId?: string): Promise<Prescription[]> {
    // return dummy data
    return [
      {
        id: "1",
        hospitalId: hospitalId,
        patientId: "1",
        staffId: "1",
        medication: "Dummy Medication 1",
        dosage: "10mg",
        frequency: "Once a day",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: "2",
        hospitalId: hospitalId,
        patientId: "2",
        staffId: "2",
        medication: "Dummy Medication 2",
        dosage: "20mg",
        frequency: "Twice a day",
        startDate: new Date(),
        endDate: new Date(),
      },
    ];
  }

  async update(id: string, prescription: Partial<Prescription>): Promise<Prescription> {
    // return dummy data
    const existing = {
      id: id,
      hospitalId: "1",
      patientId: "1",
      staffId: "1",
      medication: "Dummy Medication",
      dosage: "10mg",
      frequency: "Once a day",
      startDate: new Date(),
      endDate: new Date(),
    };
    return {
      ...existing,
      ...prescription,
    } as Prescription;
  }

  async delete(id: string, hospitalId: string): Promise<void> {
    // do nothing
    return;
  }
}
