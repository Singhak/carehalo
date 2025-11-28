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
exports.FirebaseBillingRepository = void 0;
const admin = __importStar(require("firebase-admin"));
class FirebaseBillingRepository {
    constructor() {
        this.db = admin.firestore();
        this.collection = this.db.collection("billing");
    }
    async create(billing) {
        const docRef = this.collection.doc();
        const newBilling = { ...billing, id: docRef.id };
        await docRef.set(newBilling);
        return newBilling;
    }
    async findById(id, hospitalId) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const billing = doc.data();
        return billing.hospitalId === hospitalId ? billing : null;
    }
    async findAll(hospitalId, patientId) {
        let query = this.collection.where("hospitalId", "==", hospitalId);
        if (patientId) {
            query = query.where("patientId", "==", patientId);
        }
        const snapshot = await query.get();
        return snapshot.docs.map(doc => doc.data());
    }
    async update(id, billing) {
        await this.collection.doc(id).update(billing);
        const updatedDoc = await this.collection.doc(id).get();
        return updatedDoc.data();
    }
    async delete(id, hospitalId) {
        const billing = await this.findById(id, hospitalId);
        if (billing) {
            await this.collection.doc(id).delete();
        }
        else {
            throw new Error("Billing record not found or you do not have permission to delete it.");
        }
    }
}
exports.FirebaseBillingRepository = FirebaseBillingRepository;
