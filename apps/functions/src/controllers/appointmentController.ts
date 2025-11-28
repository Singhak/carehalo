
import { Response, Request } from "express";
import { FirebaseAppointmentRepository } from "../repositories";
import { Appointment } from "@cflock/shared-models";

const appointmentRepository = new FirebaseAppointmentRepository();

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const hospitalId = req.user?.hospitalId;
    if (!hospitalId) {
      return res.status(401).send("Unauthorized: User hospital information is missing.");
    }

    const appointment = { ...req.body, hospitalId } as Appointment;
    const newAppointment = await appointmentRepository.create(appointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).send("An internal server error occurred.");
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const hospitalId = req.user?.hospitalId;
    if (!hospitalId) {
      return res.status(401).send("Unauthorized: User hospital information is missing.");
    }

    const { id } = req.params;
    const appointment = await appointmentRepository.findById(id, hospitalId);
    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }
    res.json(appointment);
  } catch (error) {
    console.error(`Error getting appointment ${req.params.id}:`, error);
    res.status(500).send("An internal server error occurred.");
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const hospitalId = req.user?.hospitalId;
    if (!hospitalId) {
      return res.status(401).send("Unauthorized: User hospital information is missing.");
    }

    const appointments = await appointmentRepository.findAll(hospitalId);
    res.json(appointments);
  } catch (error) {
    console.error("Error getting all appointments:", error);
    res.status(500).send("An internal server error occurred.");
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const hospitalId = req.user?.hospitalId;
    if (!hospitalId) {
      return res.status(401).send("Unauthorized: User hospital information is missing.");
    }

    const { id } = req.params;
    // Ensure the appointment belongs to the hospital before updating
    const existingAppointment = await appointmentRepository.findById(id, hospitalId);
    if (!existingAppointment) {
        return res.status(404).send("Appointment not found or you do not have permission to update it.");
    }
    const updatedAppointment = await appointmentRepository.update(id, req.body, hospitalId);
    res.json(updatedAppointment);
  } catch (error) {
    console.error(`Error updating appointment ${req.params.id}:`, error);
    res.status(500).send("An internal server error occurred.");
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const hospitalId = req.user?.hospitalId;
    if (!hospitalId) {
      return res.status(401).send("Unauthorized: User hospital information is missing.");
    }

    const { id } = req.params;
    await appointmentRepository.delete(id, hospitalId);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting appointment ${req.params.id}:`, error);
    res.status(500).send("An internal server error occurred.");
  }
};
