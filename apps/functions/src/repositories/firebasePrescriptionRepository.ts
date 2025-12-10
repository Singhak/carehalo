
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
      medications: [
        { medicationName: "Dummy Medication", dosage: "10mg", instructions: "Once a day" }
      ],
      date: new Date().toISOString(),
      isActive: true,
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
        medications: [
          { medicationName: "Dummy Medication 1", dosage: "10mg", instructions: "Once a day" }
        ],
        date: new Date().toISOString(),
        isActive: true,
      },
      {
        id: "2",
        hospitalId: hospitalId,
        patientId: "2",
        staffId: "2",
        medications: [
          { medicationName: "Dummy Medication 2", dosage: "20mg", instructions: "Twice a day" }
        ],
        date: new Date().toISOString(),
        isActive: true,
      },
    ];
  }

  async update(id: string, prescription: Partial<Prescription>): Promise<Prescription> {
    // return dummy data
    const existing: Prescription = {
      id: id,
      hospitalId: "1",
      patientId: "1",
      staffId: "1",
      medications: [
        { medicationName: "Dummy Medication", dosage: "10mg", instructions: "Once a day" }
      ],
      date: new Date().toISOString(),
      isActive: true,
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
