import { Router } from "express";
import { PrescriptionPrintoutController } from "./prescriptionPrintoutController";
import { FirebasePrescriptionRepository } from "../repositories/firebasePrescriptionRepository";

const router = Router();

const prescriptionRepository = new FirebasePrescriptionRepository();
const prescriptionPrintoutController = new PrescriptionPrintoutController(prescriptionRepository);

router.get("/:hospitalId/:id/print", prescriptionPrintoutController.generatePrintout.bind(prescriptionPrintoutController));

export const prescriptionPrintoutRouter = router;
