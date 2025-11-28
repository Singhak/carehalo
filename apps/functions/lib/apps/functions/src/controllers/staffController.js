"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.getStaff = exports.getStaffMember = exports.createStaff = void 0;
const repositories_1 = require("../repositories");
const staffRepository = new repositories_1.FirebaseStaffRepository();
const createStaff = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const staff = { ...req.body, hospitalId };
        const newStaff = await staffRepository.create(staff);
        res.status(201).json(newStaff);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createStaff = createStaff;
const getStaffMember = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const staff = await staffRepository.findById(id, hospitalId);
        if (!staff) {
            return res.status(404).send("Staff not found");
        }
        res.json(staff);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getStaffMember = getStaffMember;
const getStaff = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const staff = await staffRepository.findAll(hospitalId);
        res.json(staff);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getStaff = getStaff;
const updateStaff = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const existingStaff = await staffRepository.findById(id, hospitalId);
        if (!existingStaff) {
            return res.status(404).send("Staff not found or you do not have permission to update it.");
        }
        const updatedStaff = await staffRepository.update(id, req.body);
        res.json(updatedStaff);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateStaff = updateStaff;
const deleteStaff = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        await staffRepository.delete(id, hospitalId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteStaff = deleteStaff;
