
import { IPatientRepository } from '../../../../libs/data-access-interfaces/patientRepository';
import { Patient } from '../../../../libs/shared-models/patient';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export class FirebasePatientRepository implements IPatientRepository {
  private col = db.collection('patients');

  async create(tenantId: string, patient: Partial<Patient>) {
    // return dummy data
    return {
      id: "1",
      tenantId: tenantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstName: patient.firstName || "Dummy",
      middleName: patient.middleName || "Patient",
      lastName: patient.lastName || "1",
      ...patient
    } as Patient;
  }

  async getById(tenantId: string, id: string) {
    // return dummy data
    return {
      id: id,
      tenantId: tenantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstName: "Dummy",
      middleName: "Patient",
    } as Patient;
  }

  async list(tenantId: string, page = 1, limit = 25): Promise<{ items: Patient[]; total: number }> {
    // return dummy data
    const items = [
      {
        id: "1",
        tenantId: tenantId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        firstName: "Dummy",
        middleName: "Patient",
        lastName: "1",
      },
      {
        id: "2",
        tenantId: tenantId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        firstName: "Dummy",
        middleName: "Patient",
        lastName: "2",
      },
    ] as Patient[];
    return Promise.resolve({ items, total: items.length });
  }

  async update(tenantId: string, id: string, patient: Partial<Patient>) {
    // return dummy data
    return {
      id: id,
      tenantId: tenantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstName: patient.firstName || "Dummy",
      middleName: patient.middleName || "Patient",
      lastName: patient.lastName,
      ...patient
    } as Patient;
  }
}
