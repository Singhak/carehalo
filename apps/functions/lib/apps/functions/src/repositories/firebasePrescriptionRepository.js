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
exports.FirebasePrescriptionRepository = void 0;
const admin = __importStar(require("firebase-admin"));
class FirebasePrescriptionRepository {
    constructor() {
        this.db = admin.firestore();
        this.collection = this.db.collection("prescriptions");
    }
    async create(prescription) {
        // return dummy data
        return {
            ...prescription,
            id: "1",
        };
    }
    async findById(id, hospitalId) {
        // return dummy data
        return {
            id: id,
            hospitalId: hospitalId,
            patientId: "1",
            medication: "Dummy Medication",
            dosage: "10mg",
            frequency: "Once a day",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
        };
    }
    async findAll(hospitalId, patientId) {
        // return dummy data
        return [
            {
                id: "1",
                hospitalId: hospitalId,
                patientId: "1",
                medication: "Dummy Medication 1",
                dosage: "10mg",
                frequency: "Once a day",
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
            },
            {
                id: "2",
                hospitalId: hospitalId,
                patientId: "2",
                medication: "Dummy Medication 2",
                dosage: "20mg",
                frequency: "Twice a day",
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
            },
        ];
    }
    async update(id, prescription) {
        // return dummy data
        return {
            id: id,
            hospitalId: "1",
            patientId: "1",
            medication: "Dummy Medication",
            dosage: "10mg",
            frequency: "Once a day",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            ...prescription,
        };
    }
    async delete(id, hospitalId) {
        // do nothing
        return;
    }
}
exports.FirebasePrescriptionRepository = FirebasePrescriptionRepository;
