
import { Request, Response } from "express";
import { FirebaseBillingRepository } from "../repositories";
import { Billing } from "@cflock/shared-models";

const billingRepository = new FirebaseBillingRepository();

export const createBilling = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const billing = { ...req.body, hospitalId } as Billing;
    const newBilling = await billingRepository.create(billing);
    res.status(201).json(newBilling);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBillingRecord = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    const billing = await billingRepository.findById(id, hospitalId);
    if (!billing) {
      return res.status(404).send("Billing record not found");
    }
    res.json(billing);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBillingRecords = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { patientId } = req.query;
    const billing = await billingRepository.findAll(hospitalId, patientId as string | undefined);
    res.json(billing);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateBillingRecord = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    const existingBilling = await billingRepository.findById(id, hospitalId);
    if (!existingBilling) {
        return res.status(404).send("Billing record not found or you do not have permission to update it.");
    }
    const updatedBilling = await billingRepository.update(id, req.body);
    res.json(updatedBilling);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteBillingRecord = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    await billingRepository.delete(id, hospitalId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
