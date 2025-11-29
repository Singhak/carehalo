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
exports.FirebaseHospitalRepository = void 0;
const admin = __importStar(require("firebase-admin"));
class FirebaseHospitalRepository {
    constructor() {
        this.db = admin.firestore();
        this.collection = this.db.collection("hospitals");
    }
    async findById(id) {
        // return dummy data
        return {
            id: id,
            name: "Dummy Hospital",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            phone: "555-555-5555",
        };
    }
    async findAll() {
        // return dummy data
        return [
            {
                id: "1",
                name: "Dummy Hospital 1",
                address: "123 Main St",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                phone: "555-555-5555",
            },
            {
                id: "2",
                name: "Dummy Hospital 2",
                address: "456 Oak St",
                city: "Othertown",
                state: "CA",
                zip: "67890",
                phone: "555-555-5556",
            },
        ];
    }
}
exports.FirebaseHospitalRepository = FirebaseHospitalRepository;
