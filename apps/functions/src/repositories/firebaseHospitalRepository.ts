
import { IHospitalRepository } from "@cflock/data-access-interfaces";
import { Hospital } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebaseHospitalRepository implements IHospitalRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("hospitals");

  async findById(id: string): Promise<Hospital | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data() as Hospital;
  }
}
