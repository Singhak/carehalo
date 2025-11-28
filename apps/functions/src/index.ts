import * as functions from 'firebase-functions';
import express from 'express';
import * as admin from 'firebase-admin';
admin.initializeApp();
import { authMiddleware } from './middleware/authMiddleware';
import { patientRouter } from './controllers/patientController';
import { communicationRouter } from './controllers/communicationRoutes';
import { appointmentRouter } from './controllers/appointmentRoutes';
import { prescriptionRouter } from './controllers/prescriptionRoutes';
import { staffRouter } from './controllers/staffRoutes';
import { billingRouter } from './controllers/billingRoutes';
import { prescriptionPrintoutRouter } from './controllers/prescriptionPrintoutRoutes';
import { sharePrescriptionRouter } from './controllers/sharePrescriptionRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

// All API routes are protected
app.use(authMiddleware);
app.use('/patients', patientRouter);
app.use('/appointments', appointmentRouter);
app.use('/prescriptions', prescriptionRouter);
app.use('/staff', staffRouter);
app.use('/billing', billingRouter);
app.use('/communication', communicationRouter);
app.use('/share', sharePrescriptionRouter);

// Global error handler for the main app
app.use(errorHandler);

export const api = functions.https.onRequest(app);

const publicApp = express();
publicApp.use(express.json());
publicApp.use('/prescriptions', prescriptionPrintoutRouter);

// Global error handler for the public app
publicApp.use(errorHandler);

export const publicApi = functions.https.onRequest(publicApp);

export * from './auth/onCreate';
export * from './staff/onStaffCreate';