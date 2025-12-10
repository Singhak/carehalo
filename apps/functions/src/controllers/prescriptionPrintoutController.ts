import { IPrescriptionRepository } from "@cflock/data-access-interfaces";
import { Request, Response } from "express";
import * as puppeteer from "puppeteer";

export class PrescriptionPrintoutController {
  constructor(private readonly prescriptionRepository: IPrescriptionRepository) {}

  async generatePrintout(req: Request, res: Response): Promise<void> {
    try {
      const { id, hospitalId } = req.params;
      if (!id || !hospitalId) {
        res.status(400).send("Missing required parameters: id and hospitalId");
        return;
      }

      const prescription = await this.prescriptionRepository.findById(id, hospitalId);

      if (!prescription) {
        res.status(404).send("Prescription not found");
        return;
      }

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Create a more professional and detailed HTML structure
      const htmlContent = `
        <html>
          <head>
            <title>Prescription Printout</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .header { text-align: center; margin-bottom: 40px; }
              .medication-details { width: 100%; border-collapse: collapse; margin-top: 20px; }
              .medication-details th, .medication-details td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .footer { text-align: center; margin-top: 50px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Prescription Details</h1>
            </div>
            <p><strong>Patient ID:</strong> ${prescription.patientId}</p>
            <p><strong>Date:</strong> ${new Date(prescription.date).toLocaleDateString()}</p>
            <table class="medication-details">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                ${prescription.medications.map(med => `
                  <tr>
                    <td>${med.medicationName}</td>
                    <td>${med.dosage}</td>
                    <td>${med.instructions}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="footer">
              <p>Electronically generated prescription. Signature not required.</p>
            </div>
          </body>
        </html>
      `;

      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ format: 'A4' });
      await browser.close();

      res.set({ "Content-Type": "application/pdf", "Content-Length": pdfBuffer.length });
      res.send(pdfBuffer);

    } catch (error) {
      console.error("Error generating PDF: ", error);
      res.status(500).send("Error generating prescription printout.");
    }
  }
}
