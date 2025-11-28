"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharePrescription = void 0;
const admin = __importStar(require("firebase-admin"));
const sharePrescription = async (req, res) => {
    const { prescriptionId } = req.body;
    const tenantId = req.user.tenantId;
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
    }
    catch (error) {
        console.error('Error sharing prescription:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.sharePrescription = sharePrescription;
