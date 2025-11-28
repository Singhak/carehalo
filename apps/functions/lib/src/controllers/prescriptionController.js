"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrescription = exports.updatePrescription = exports.getPrescriptions = exports.getPrescription = exports.createPrescription = void 0;
const repositories_1 = require("../repositories");
const prescriptionRepository = new repositories_1.FirebasePrescriptionRepository();
const createPrescription = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const prescription = { ...req.body, hospitalId };
        const newPrescription = await prescriptionRepository.create(prescription);
        res.status(201).json(newPrescription);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createPrescription = createPrescription;
const getPrescription = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const prescription = await prescriptionRepository.findById(id, hospitalId);
        if (!prescription) {
            return res.status(404).send("Prescription not found");
        }
        res.json(prescription);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPrescription = getPrescription;
const getPrescriptions = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { patientId } = req.query;
        const prescriptions = await prescriptionRepository.findAll(hospitalId, patientId);
        res.json(prescriptions);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPrescriptions = getPrescriptions;
const updatePrescription = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const existingPrescription = await prescriptionRepository.findById(id, hospitalId);
        if (!existingPrescription) {
            return res.status(404).send("Prescription not found or you do not have permission to update it.");
        }
        const updatedPrescription = await prescriptionRepository.update(id, req.body);
        res.json(updatedPrescription);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updatePrescription = updatePrescription;
const deletePrescription = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        await prescriptionRepository.delete(id, hospitalId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deletePrescription = deletePrescription;
