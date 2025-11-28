
import { Request, Response } from "express";
import { FirebasePrescriptionRepository } from "../repositories";
import { Prescription } from "@cflock/shared-models";

const prescriptionRepository = new FirebasePrescriptionRepository();

export const createPrescription = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const prescription = { ...req.body, hospitalId } as Prescription;
    const newPrescription = await prescriptionRepository.create(prescription);
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getPrescription = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    const prescription = await prescriptionRepository.findById(id, hospitalId);
    if (!prescription) {
      return res.status(404).send("Prescription not found");
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getPrescriptions = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { patientId } = req.query;
    const prescriptions = await prescriptionRepository.findAll(hospitalId, patientId as string | undefined);
    res.json(prescriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updatePrescription = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    const existingPrescription = await prescriptionRepository.findById(id, hospitalId);
    if (!existingPrescription) {
        return res.status(404).send("Prescription not found or you do not have permission to update it.");
    }
    const updatedPrescription = await prescriptionRepository.update(id, req.body);
    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deletePrescription = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    await prescriptionRepository.delete(id, hospitalId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
