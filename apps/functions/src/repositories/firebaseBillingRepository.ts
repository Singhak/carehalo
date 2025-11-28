
import { IBillingRepository } from "@cflock/data-access-interfaces";
import { Billing } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebaseBillingRepository implements IBillingRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("billing");

  async create(billing: Billing): Promise<Billing> {
    const docRef = this.collection.doc();
    const newBilling = { ...billing, id: docRef.id };
    await docRef.set(newBilling);
    return newBilling;
  }

  async findById(id: string, hospitalId: string): Promise<Billing | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const billing = doc.data() as Billing;
    return billing.hospitalId === hospitalId ? billing : null;
  }

  async findAll(hospitalId: string, patientId?: string): Promise<Billing[]> {
    let query: admin.firestore.Query = this.collection.where("hospitalId", "==", hospitalId);
    if (patientId) {
      query = query.where("patientId", "==", patientId);
    }
    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data() as Billing);
  }

  async update(id: string, billing: Partial<Billing>): Promise<Billing> {
    await this.collection.doc(id).update(billing);
    const updatedDoc = await this.collection.doc(id).get();
    return updatedDoc.data() as Billing;
  }

  async delete(id: string, hospitalId: string): Promise<void> {
    const billing = await this.findById(id, hospitalId);
    if (billing) {
      await this.collection.doc(id).delete();
    } else {
      throw new Error("Billing record not found or you do not have permission to delete it.");
    }
  }
}
