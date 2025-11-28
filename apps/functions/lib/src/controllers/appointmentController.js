"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.getAppointments = exports.getAppointment = exports.createAppointment = void 0;
const repositories_1 = require("../repositories");
const appointmentRepository = new repositories_1.FirebaseAppointmentRepository();
const createAppointment = async (req, res) => {
    try {
        const { hospitalId } = req.user; // from auth middleware
        const appointment = { ...req.body, hospitalId };
        const newAppointment = await appointmentRepository.create(appointment);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createAppointment = createAppointment;
const getAppointment = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        const appointment = await appointmentRepository.findById(id, hospitalId);
        if (!appointment) {
            return res.status(404).send("Appointment not found");
        }
        res.json(appointment);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAppointment = getAppointment;
const getAppointments = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const appointments = await appointmentRepository.findAll(hospitalId);
        res.json(appointments);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAppointments = getAppointments;
const updateAppointment = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        // Ensure the appointment belongs to the hospital before updating
        const existingAppointment = await appointmentRepository.findById(id, hospitalId);
        if (!existingAppointment) {
            return res.status(404).send("Appointment not found or you do not have permission to update it.");
        }
        const updatedAppointment = await appointmentRepository.update(id, req.body);
        res.json(updatedAppointment);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const { id } = req.params;
        await appointmentRepository.delete(id, hospitalId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteAppointment = deleteAppointment;
