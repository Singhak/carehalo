import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { FirebasePrescriptionRepository, FirebaseHospitalRepository, FirebaseStaffRepository, FirebasePatientRepository } from "../repositories";

const prescriptionRepository = new FirebasePrescriptionRepository();
const hospitalRepository = new FirebaseHospitalRepository();
const staffRepository = new FirebaseStaffRepository();
const patientRepository = new FirebasePatientRepository();

export const generatePrescriptionPdf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.query;

    if (!tenantId) {
      return res.status(400).send("Missing tenantId");
    }

    const hospitalId = tenantId as string;

    const prescription = await prescriptionRepository.findById(id, hospitalId);

    if (!prescription) {
      return res.status(404).send("Prescription not found");
    }

    const hospitalDetails = await hospitalRepository.findById(hospitalId);
    const doctorDetails = await staffRepository.findById(prescription.staffId, hospitalId);
    const patientDetails = await patientRepository.getById(hospitalId, prescription.patientId);


    const doc = new PDFDocument();

    const doctorName = doctorDetails ? [doctorDetails.firstName, doctorDetails.lastName].filter(Boolean).join(" ") : "";
    const patientName = patientDetails ? [patientDetails.firstName, patientDetails.middleName, patientDetails.lastName].filter(Boolean).join(" ") : "N/A";

    // Header
    doc.fontSize(20).text(hospitalDetails?.name || "Cflock Hospital", { align: "center" });
    if (doctorDetails) {
      doc.fontSize(12).text(`Dr. ${doctorName}, ${doctorDetails.degree || ''}`, { align: "center" });
      doc.fontSize(10).text(doctorDetails.timing || '', { align: "center" });
    }
    doc.moveDown();

    // Prescription details
    doc.fontSize(14).text("Prescription", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Patient: ${patientName}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Medication: ${prescription.medication}`);
    doc.text(`Dosage: ${prescription.dosage}`);
    doc.text(`Frequency: ${prescription.frequency}`);
    doc.text(`Start Date: ${new Date(prescription.startDate).toLocaleDateString()}`);
    doc.text(`End Date: ${new Date(prescription.endDate).toLocaleDateString()}`);


    // Footer
    // place footer text centered near bottom
    doc.fontSize(10).text(hospitalDetails?.address || "", 72, 700, { align: "center" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=prescription-${id}.pdf`);

    doc.pipe(res);
    doc.end();

  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
