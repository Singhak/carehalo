"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const firebasePatientRepository_1 = require("../repositories/firebasePatientRepository");
const asyncHandler_1 = require("../utils/asyncHandler");
const AppError_1 = __importDefault(require("../utils/AppError"));
const repo = new firebasePatientRepository_1.FirebasePatientRepository();
exports.patientRouter = (0, express_1.Router)();
exports.patientRouter.get('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { hospitalId } = req.user;
    const data = await repo.list(hospitalId);
    res.json(data.items);
}));
exports.patientRouter.post('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { hospitalId } = req.user;
    const body = req.body;
    const created = await repo.create(hospitalId, body);
    res.status(201).json(created);
}));
exports.patientRouter.get('/:id', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { hospitalId } = req.user;
    const { id } = req.params;
    const p = await repo.getById(hospitalId, id);
    if (!p)
        throw new AppError_1.default('Patient not found', 404);
    res.json(p);
}));
exports.patientRouter.put('/:id', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { hospitalId } = req.user;
    const { id } = req.params;
    const body = req.body;
    const updated = await repo.update(hospitalId, id, body);
    res.json(updated);
}));
