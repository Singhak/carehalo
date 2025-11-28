
import { IPrescriptionRepository } from "@cflock/data-access-interfaces";
import { Prescription } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebasePrescriptionRepository implements IPrescriptionRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("prescriptions");

  async create(prescription: Prescription): Promise<Prescription> {
    const docRef = this.collection.doc();
    const newPrescription = { ...prescription, id: docRef.id };
    await docRef.set(newPrescription);
    return newPrescription;
  }

  async findById(id: string, hospitalId: string): Promise<Prescription | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const prescription = doc.data() as Prescription;
    return prescription.hospitalId === hospitalId ? prescription : null;
  }

  async findAll(hospitalId: string, patientId?: string): Promise<Prescription[]> {
    let query: admin.firestore.Query = this.collection.where("hospitalId", "==", hospitalId);
    if (patientId) {
      query = query.where("patientId", "==", patientId);
    }
    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data() as Prescription);
  }

  async update(id: string, prescription: Partial<Prescription>): Promise<Prescription> {
    await this.collection.doc(id).update(prescription);
    const updatedDoc = await this.collection.doc(id).get();
    return updatedDoc.data() as Prescription;
  }

  async delete(id: string, hospitalId: string): Promise<void> {
    const prescription = await this.findById(id, hospitalId);
    if (prescription) {
      await this.collection.doc(id).delete();
    } else {
      throw new Error("Prescription not found or you do not have permission to delete it.");
    }
  }
}
