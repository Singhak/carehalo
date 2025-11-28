import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const sharePrescription = async (req: Request, res: Response) => {
  const { prescriptionId } = req.body;
  const tenantId = (req as any).user.tenantId;

  if (!prescriptionId) {
    res.status(400).send('Missing prescriptionId');
    return;
  }

  try {
    const db = admin.firestore();

    const prescriptionDoc = await db.collection(`hospitals/${tenantId}/prescriptions`).doc(prescriptionId).get();
    const prescription = prescriptionDoc.data();

    if (!prescription) {
      res.status(404).send('Prescription not found.');
      return;
    }

    const patientId = prescription.patientId;
    const patientDoc = await db.collection(`hospitals/${tenantId}/patients`).doc(patientId).get();
    const patient = patientDoc.data();
    const phoneNumber = patient?.phone;

    if (!phoneNumber) {
      res.status(404).send('Patient phone number not found.');
      return;
    }

    // IMPORTANT: This is not a secure way to share prescriptions.
    // In a real application, you should generate a short-lived, signed URL
    // that provides temporary access to the prescription PDF.
    const region = process.env.FUNCTION_REGION || 'us-central1';
    const projectId = process.env.GCLOUD_PROJECT;
    const downloadLink = `https://${region}-${projectId}.cloudfunctions.net/publicApi/prescriptions/${prescriptionId}/print?tenantId=${tenantId}`;

    console.log(`Sending SMS to ${phoneNumber}: Your prescription is ready. Download it here: ${downloadLink}`);

    res.status(200).send({ success: true, message: 'SMS sent successfully (mocked).' });

  } catch (error) {
    console.error('Error sharing prescription:', error);
    res.status(500).send('Internal Server Error');
  }
};
