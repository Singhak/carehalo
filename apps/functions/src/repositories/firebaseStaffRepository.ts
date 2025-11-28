
import { IStaffRepository } from "@cflock/data-access-interfaces";
import { Staff } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebaseStaffRepository implements IStaffRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("staff");

  async create(staff: Staff): Promise<Staff> {
    const docRef = this.collection.doc();
    const newStaff = { ...staff, id: docRef.id };
    await docRef.set(newStaff);
    return newStaff;
  }

  async findById(id: string, hospitalId: string): Promise<Staff | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const staff = doc.data() as Staff;
    return staff.hospitalId === hospitalId ? staff : null;
  }

  async findByUserId(userId: string, hospitalId: string): Promise<Staff | null> {
    const snapshot = await this.collection
      .where("userId", "==", userId)
      .where("hospitalId", "==", hospitalId)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data() as Staff;
  }

  async findAll(hospitalId: string): Promise<Staff[]> {
    const snapshot = await this.collection.where("hospitalId", "==", hospitalId).get();
    return snapshot.docs.map(doc => doc.data() as Staff);
  }

  async update(id: string, staff: Partial<Staff>): Promise<Staff> {
    await this.collection.doc(id).update(staff);
    const updatedDoc = await this.collection.doc(id).get();
    return updatedDoc.data() as Staff;
  }

  async delete(id: string, hospitalId: string): Promise<void> {
    const staff = await this.findById(id, hospitalId);
    if (staff) {
      await this.collection.doc(id).delete();
    } else {
      throw new Error("Staff not found or you do not have permission to delete it.");
    }
  }
}
