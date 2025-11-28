"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionPrintoutRouter = void 0;
const express_1 = require("express");
const prescriptionPrintoutController_1 = require("./prescriptionPrintoutController");
const router = (0, express_1.Router)();
router.get("/:id/print", prescriptionPrintoutController_1.generatePrescriptionPdf);
exports.prescriptionPrintoutRouter = router;
