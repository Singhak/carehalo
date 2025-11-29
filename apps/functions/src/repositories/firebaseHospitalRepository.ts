
import { IHospitalRepository } from "@cflock/data-access-interfaces";
import { Hospital } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebaseHospitalRepository implements IHospitalRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("hospitals");

  async findById(id: string): Promise<Hospital | null> {
    // return dummy data
    return {
      id: id,
      name: "Dummy Hospital",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      phone: "555-555-5555",
    };
  }

  async findAll(): Promise<Hospital[]> {
    // return dummy data
    return [
      {
        id: "1",
        name: "Dummy Hospital 1",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        phone: "555-555-5555",
      },
      {
        id: "2",
        name: "Dummy Hospital 2",
        address: "456 Oak St",
        city: "Othertown",
        state: "CA",
        zip: "67890",
        phone: "555-555-5556",
      },
    ];
  }
}
