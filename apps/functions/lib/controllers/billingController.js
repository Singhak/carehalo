"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBillingRecord = exports.updateBillingRecord = exports.getBillingRecords = exports.getBillingRecord = exports.createBilling = void 0;
const repositories_1 = require("../repositories");
const billingRepository = new repositories_1.FirebaseBillingRepository();
const createBilling = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const billing = { ...req.body, hospitalId };
        const newBilling = await billingRepository.create(billing);
        res.status(201).json(newBilling);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createBilling = createBilling;
const getBillingRecord = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const billing = await billingRepository.findById(id, hospitalId);
        if (!billing) {
            return res.status(404).send("Billing record not found");
        }
        res.json(billing);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getBillingRecord = getBillingRecord;
const getBillingRecords = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { patientId } = req.query;
        const billing = await billingRepository.findAll(hospitalId, patientId);
        res.json(billing);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getBillingRecords = getBillingRecords;
const updateBillingRecord = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const existingBilling = await billingRepository.findById(id, hospitalId);
        if (!existingBilling) {
            return res.status(404).send("Billing record not found or you do not have permission to update it.");
        }
        const updatedBilling = await billingRepository.update(id, req.body);
        res.json(updatedBilling);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateBillingRecord = updateBillingRecord;
const deleteBillingRecord = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        await billingRepository.delete(id, hospitalId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteBillingRecord = deleteBillingRecord;
