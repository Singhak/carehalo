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
exports.FirebaseStaffRepository = void 0;
const admin = __importStar(require("firebase-admin"));
class FirebaseStaffRepository {
    constructor() {
        this.db = admin.firestore();
        this.collection = this.db.collection("staff");
    }
    async create(staff) {
        const docRef = this.collection.doc();
        const newStaff = { ...staff, id: docRef.id };
        await docRef.set(newStaff);
        return newStaff;
    }
    async findById(id, hospitalId) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const staff = doc.data();
        return staff.hospitalId === hospitalId ? staff : null;
    }
    async findByUserId(userId, hospitalId) {
        const snapshot = await this.collection
            .where("userId", "==", userId)
            .where("hospitalId", "==", hospitalId)
            .limit(1)
            .get();
        if (snapshot.empty) {
            return null;
        }
        return snapshot.docs[0].data();
    }
    async findAll(hospitalId) {
        const snapshot = await this.collection.where("hospitalId", "==", hospitalId).get();
        return snapshot.docs.map(doc => doc.data());
    }
    async update(id, staff) {
        await this.collection.doc(id).update(staff);
        const updatedDoc = await this.collection.doc(id).get();
        return updatedDoc.data();
    }
    async delete(id, hospitalId) {
        const staff = await this.findById(id, hospitalId);
        if (staff) {
            await this.collection.doc(id).delete();
        }
        else {
            throw new Error("Staff not found or you do not have permission to delete it.");
        }
    }
}
exports.FirebaseStaffRepository = FirebaseStaffRepository;
