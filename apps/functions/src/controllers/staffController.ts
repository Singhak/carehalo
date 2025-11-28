
import { Request, Response } from "express";
import { FirebaseStaffRepository } from "../repositories";
import { Staff } from "@cflock/shared-models";

const staffRepository = new FirebaseStaffRepository();

export const createStaff = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const staff = { ...req.body, hospitalId } as Staff;
    const newStaff = await staffRepository.create(staff);
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getStaffMember = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    const staff = await staffRepository.findById(id, hospitalId);
    if (!staff) {
      return res.status(404).send("Staff not found");
    }
    res.json(staff);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getStaff = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const staff = await staffRepository.findAll(hospitalId);
    res.json(staff);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    const existingStaff = await staffRepository.findById(id, hospitalId);
    if (!existingStaff) {
        return res.status(404).send("Staff not found or you do not have permission to update it.");
    }
    const updatedStaff = await staffRepository.update(id, req.body);
    res.json(updatedStaff);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = (req as any).user;
    const { id } = req.params;
    await staffRepository.delete(id, hospitalId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
