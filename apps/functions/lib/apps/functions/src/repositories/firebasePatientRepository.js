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
        const ref = this.col.doc();
        const now = new Date().toISOString();
        const data = { id: ref.id, tenantId, createdAt: now, updatedAt: now, fullName: patient.fullName || '', ...patient };
        await ref.set(data);
        return data;
    }
    async getById(tenantId, id) {
        const snap = await this.col.doc(id).get();
        if (!snap.exists)
            return null;
        const data = snap.data();
        return data.tenantId === tenantId ? data : null;
    }
    async list(tenantId, page = 1, limit = 25) {
        const snapshot = await this.col.where('tenantId', '==', tenantId).limit(limit).get();
        const items = snapshot.docs.map(d => d.data());
        return { items, total: items.length };
    }
    async update(tenantId, id, patient) {
        const existing = await this.getById(tenantId, id);
        if (!existing)
            throw new Error('Patient not found');
        const now = new Date().toISOString();
        const data = { ...patient, updatedAt: now };
        await this.col.doc(id).update(data);
        return { ...existing, ...data };
    }
}
exports.FirebasePatientRepository = FirebasePatientRepository;
