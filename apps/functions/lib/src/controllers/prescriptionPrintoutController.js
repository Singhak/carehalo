"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrescriptionPdf = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const repositories_1 = require("../repositories");
const prescriptionRepository = new repositories_1.FirebasePrescriptionRepository();
const hospitalRepository = new repositories_1.FirebaseHospitalRepository();
const staffRepository = new repositories_1.FirebaseStaffRepository();
const patientRepository = new repositories_1.FirebasePatientRepository();
const generatePrescriptionPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const { tenantId } = req.query;
        if (!tenantId) {
            return res.status(400).send("Missing tenantId");
        }
        const hospitalId = tenantId;
        const prescription = await prescriptionRepository.findById(id, hospitalId);
        if (!prescription) {
            return res.status(404).send("Prescription not found");
        }
        const hospitalDetails = await hospitalRepository.findById(hospitalId);
        const doctorDetails = await staffRepository.findById(prescription.staffId, hospitalId);
        const patientDetails = await patientRepository.getById(hospitalId, prescription.patientId);
        const doc = new pdfkit_1.default();
        // Header
        doc.fontSize(20).text(hospitalDetails?.name || "Cflock Hospital", { align: "center" });
        if (doctorDetails) {
            doc.fontSize(12).text(`Dr. ${doctorDetails.name}, ${doctorDetails.degree || ''}`, { align: "center" });
            doc.fontSize(10).text(doctorDetails.timing || '', { align: "center" });
        }
        doc.moveDown();
        // Prescription details
        doc.fontSize(14).text("Prescription", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Patient: ${patientDetails?.fullName || 'N/A'}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown();
        doc.text(`Medication: ${prescription.medication}`);
        doc.text(`Dosage: ${prescription.dosage}`);
        doc.text(`Frequency: ${prescription.frequency}`);
        doc.text(`Start Date: ${new Date(prescription.startDate).toLocaleDateString()}`);
        doc.text(`End Date: ${new Date(prescription.endDate).toLocaleDateString()}`);
        // Footer
        doc.fontSize(10).text(hospitalDetails?.address || "", { align: "center", y: 700 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=prescription-${id}.pdf`);
        doc.pipe(res);
        doc.end();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.generatePrescriptionPdf = generatePrescriptionPdf;
