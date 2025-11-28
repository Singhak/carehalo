
import { IAppointmentRepository } from "@cflock/data-access-interfaces";
import { Appointment } from "@cflock/shared-models";
import * as admin from "firebase-admin";

export class FirebaseAppointmentRepository implements IAppointmentRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("appointments");

  async create(appointment: Appointment): Promise<Appointment> {
    const docRef = this.collection.doc();
    const newAppointment = { ...appointment, id: docRef.id };
    await docRef.set(newAppointment);
    return newAppointment;
  }

  async findById(id: string, hospitalId: string): Promise<Appointment | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const appointment = doc.data() as Appointment;
    return appointment.hospitalId === hospitalId ? appointment : null;
  }

  async findAll(hospitalId: string): Promise<Appointment[]> {
    const snapshot = await this.collection.where("hospitalId", "==", hospitalId).get();
    return snapshot.docs.map(doc => doc.data() as Appointment);
  }

  async update(id: string, appointment: Partial<Appointment>, hospitalId: string): Promise<Appointment> {
    // Ensure the appointment belongs to the hospital before updating
    const existingAppointment = await this.findById(id, hospitalId);
    if (!existingAppointment) {
      throw new Error("Appointment not found or you do not have permission to update it.");
    }
    await this.collection.doc(id).update(appointment);
    const updatedDoc = await this.collection.doc(id).get();
    return updatedDoc.data() as Appointment;
  }

  async delete(id: string, hospitalId: string): Promise<void> {
    // Ensure the appointment belongs to the hospital before deleting
    const appointment = await this.findById(id, hospitalId);
    if (appointment) {
      await this.collection.doc(id).delete();
    } else {
      throw new Error("Appointment not found or you do not have permission to delete it.");
    }
  }
}
