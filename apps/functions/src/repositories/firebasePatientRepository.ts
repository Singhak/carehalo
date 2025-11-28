
import { IPatientRepository } from '../../../../libs/data-access-interfaces/patientRepository';
import { Patient } from '../../../../libs/shared-models/patient';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export class FirebasePatientRepository implements IPatientRepository {
  private col = db.collection('patients');

  async create(tenantId: string, patient: Partial<Patient>) {
    const ref = this.col.doc();
    const now = new Date().toISOString();
    const data: Patient = { id: ref.id, tenantId, createdAt: now, updatedAt: now, fullName: patient.fullName || '', ...patient } as Patient;
    await ref.set(data);
    return data;
  }

  async getById(tenantId: string, id: string) {
    const snap = await this.col.doc(id).get();
    if (!snap.exists) return null;
    const data = snap.data() as Patient;
    return data.tenantId === tenantId ? data : null;
  }

  async list(tenantId: string, page = 1, limit = 25) {
    const snapshot = await this.col.where('tenantId', '==', tenantId).limit(limit).get();
    const items = snapshot.docs.map(d => d.data() as Patient);
    return { items, total: items.length };
  }

  async update(tenantId: string, id: string, patient: Partial<Patient>) {
    const existing = await this.getById(tenantId, id);
    if (!existing) throw new Error('Patient not found');

    const now = new Date().toISOString();
    const data = { ...patient, updatedAt: now };
    await this.col.doc(id).update(data);
    return { ...existing, ...data };
  }
}