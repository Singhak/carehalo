
import { Router } from "express";
import { generatePrescriptionPdf } from "./prescriptionPrintoutController";

const router = Router();

router.get("/:id/print", generatePrescriptionPdf);

export const prescriptionPrintoutRouter = router;
