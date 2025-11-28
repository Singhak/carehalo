
import { Router } from "express";
import {
  createPrescription,
  getPrescription,
  getPrescriptions,
  updatePrescription,
  deletePrescription,
} from "./prescriptionController";

const router = Router();

router.post("/", createPrescription);
router.get("/:id", getPrescription);
router.get("/", getPrescriptions);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

export const prescriptionRouter = router;
