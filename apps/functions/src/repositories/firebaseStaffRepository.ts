
import { IStaffRepository } from "@cflock/data-access-interfaces";
import { Staff } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebaseStaffRepository implements IStaffRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("staff");

  async create(staff: Staff): Promise<Staff> {
    // return dummy data
    return {
      ...staff,
      id: "1",
    };
  }

  async findById(id: string, hospitalId: string): Promise<Staff | null> {
    // return dummy data
    return {
      id: id,
      hospitalId: hospitalId,
      userId: "1",
      firstName: "Dr.",
      lastName: "Dummy",
      role: "doctor",
    };
  }

  async findByUserId(userId: string, hospitalId: string): Promise<Staff | null> {
    // return dummy data
    return {
      id: "1",
      hospitalId: hospitalId,
      userId: userId,
      firstName: "Dr.",
      lastName: "Dummy",
      role: "doctor",
    };
  }

  async findAll(hospitalId: string): Promise<Staff[]> {
    // return dummy data
    return [
      {
        id: "1",
        hospitalId: hospitalId,
        userId: "1",
        firstName: "Dr.",
        lastName: "Dummy",
        role: "doctor",
      },
      {
        id: "2",
        hospitalId: hospitalId,
        userId: "2",
        firstName: "Nurse",
        lastName: "Dummy",
        role: "nurse",
      },
    ];
  }

  async update(id: string, staff: Partial<Staff>): Promise<Staff> {
    // return dummy data
    const existing = {
        id: id,
        hospitalId: "1",
        userId: "1",
        firstName: "Dr.",
        lastName: "Dummy",
        role: "doctor",
    };
    return {
        ...existing,
        ...staff
    } as Staff;
  }

  async delete(id: string, hospitalId: string): Promise<void> {
    // do nothing
    return;
  }
}
