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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicApi = exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const express = __importStar(require("express"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const authMiddleware_1 = require("./middleware/authMiddleware");
const patientController_1 = require("./controllers/patientController");
const communicationRoutes_1 = require("./controllers/communicationRoutes");
const appointmentRoutes_1 = require("./controllers/appointmentRoutes");
const prescriptionRoutes_1 = require("./controllers/prescriptionRoutes");
const staffRoutes_1 = require("./controllers/staffRoutes");
const billingRoutes_1 = require("./controllers/billingRoutes");
const prescriptionPrintoutRoutes_1 = require("./controllers/prescriptionPrintoutRoutes");
const sharePrescriptionRoutes_1 = require("./controllers/sharePrescriptionRoutes");
const app = express();
app.use(express.json());
// All API routes are protected
app.use(authMiddleware_1.authMiddleware);
app.use('/patients', patientController_1.patientRouter);
app.use('/appointments', appointmentRoutes_1.appointmentRouter);
app.use('/prescriptions', prescriptionRoutes_1.prescriptionRouter);
app.use('/staff', staffRoutes_1.staffRouter);
app.use('/billing', billingRoutes_1.billingRouter);
app.use('/communication', communicationRoutes_1.communicationRouter);
app.use('/share', sharePrescriptionRoutes_1.sharePrescriptionRouter);
exports.api = functions.https.onRequest(app);
const publicApp = express();
publicApp.use(express.json());
publicApp.use('/prescriptions', prescriptionPrintoutRoutes_1.prescriptionPrintoutRouter);
exports.publicApi = functions.https.onRequest(publicApp);
__exportStar(require("./auth/onCreate"), exports);
__exportStar(require("./staff/onStaffCreate"), exports);
