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
exports.FirebasePatientRepository = void 0;
const admin = __importStar(require("firebase-admin"));
const db = admin.firestore();
class FirebasePatientRepository {
    constructor() {
        this.col = db.collection('patients');
    }
    async create(tenantId, patient) {
        // return dummy data
        return {
            id: "1",
            tenantId: tenantId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullName: patient.fullName || "Dummy Patient",
            ...patient
        };
    }
    async getById(tenantId, id) {
        // return dummy data
        return {
            id: id,
            tenantId: tenantId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullName: "Dummy Patient",
        };
    }
    async list(tenantId, page = 1, limit = 25) {
        // return dummy data
        const items = [
            {
                id: "1",
                tenantId: tenantId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                fullName: "Dummy Patient 1",
            },
            {
                id: "2",
                tenantId: tenantId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                fullName: "Dummy Patient 2",
            },
        ];
        return { items, total: items.length };
    }
    async update(tenantId, id, patient) {
        // return dummy data
        return {
            id: id,
            tenantId: tenantId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullName: patient.fullName || "Dummy Patient",
            ...patient
        };
    }
}
exports.FirebasePatientRepository = FirebasePatientRepository;
