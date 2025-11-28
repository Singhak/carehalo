"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.getAppointments = exports.getAppointment = exports.createAppointment = void 0;
const repositories_1 = require("../repositories");
const appointmentRepository = new repositories_1.FirebaseAppointmentRepository();
const createAppointment = async (req, res) => {
    try {
        const hospitalId = req.user?.hospitalId;
        if (!hospitalId) {
            return res.status(401).send("Unauthorized: User hospital information is missing.");
        }
        const appointment = { ...req.body, hospitalId };
        const newAppointment = await appointmentRepository.create(appointment);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).send("An internal server error occurred.");
    }
};
exports.createAppointment = createAppointment;
const getAppointment = async (req, res) => {
    try {
        const hospitalId = req.user?.hospitalId;
        if (!hospitalId) {
            return res.status(401).send("Unauthorized: User hospital information is missing.");
        }
        const { id } = req.params;
        const appointment = await appointmentRepository.findById(id, hospitalId);
        if (!appointment) {
            return res.status(404).send("Appointment not found");
        }
        res.json(appointment);
    }
    catch (error) {
        console.error(`Error getting appointment ${req.params.id}:`, error);
        res.status(500).send("An internal server error occurred.");
    }
};
exports.getAppointment = getAppointment;
const getAppointments = async (req, res) => {
    try {
        const hospitalId = req.user?.hospitalId;
        if (!hospitalId) {
            return res.status(401).send("Unauthorized: User hospital information is missing.");
        }
        const appointments = await appointmentRepository.findAll(hospitalId);
        res.json(appointments);
    }
    catch (error) {
        console.error("Error getting all appointments:", error);
        res.status(500).send("An internal server error occurred.");
    }
};
exports.getAppointments = getAppointments;
const updateAppointment = async (req, res) => {
    try {
        const hospitalId = req.user?.hospitalId;
        if (!hospitalId) {
            return res.status(401).send("Unauthorized: User hospital information is missing.");
        }
        const { id } = req.params;
        // Ensure the appointment belongs to the hospital before updating
        const existingAppointment = await appointmentRepository.findById(id, hospitalId);
        if (!existingAppointment) {
            return res.status(404).send("Appointment not found or you do not have permission to update it.");
        }
        const updatedAppointment = await appointmentRepository.update(id, req.body, hospitalId);
        res.json(updatedAppointment);
    }
    catch (error) {
        console.error(`Error updating appointment ${req.params.id}:`, error);
        res.status(500).send("An internal server error occurred.");
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res) => {
    try {
        const hospitalId = req.user?.hospitalId;
        if (!hospitalId) {
            return res.status(401).send("Unauthorized: User hospital information is missing.");
        }
        const { id } = req.params;
        await appointmentRepository.delete(id, hospitalId);
        res.status(204).send();
    }
    catch (error) {
        console.error(`Error deleting appointment ${req.params.id}:`, error);
        res.status(500).send("An internal server error occurred.");
    }
};
exports.deleteAppointment = deleteAppointment;
