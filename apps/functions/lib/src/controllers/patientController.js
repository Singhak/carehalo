"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const firebasePatientRepository_1 = require("../repositories/firebasePatientRepository");
const repo = new firebasePatientRepository_1.FirebasePatientRepository();
exports.patientRouter = (0, express_1.Router)();
exports.patientRouter.get('/', async (req, res) => {
    const hospitalId = req.user.hospitalId;
    const data = await repo.list(hospitalId);
    res.json(data.items);
});
exports.patientRouter.post('/', async (req, res) => {
    const hospitalId = req.user.hospitalId;
    const body = req.body;
    const created = await repo.create(hospitalId, body);
    res.status(201).json(created);
});
exports.patientRouter.get('/:id', async (req, res) => {
    const hospitalId = req.user.hospitalId;
    const id = req.params.id;
    const p = await repo.getById(hospitalId, id);
    if (!p)
        return res.status(404).json({ error: 'Not found' });
    res.json(p);
});
exports.patientRouter.put('/:id', async (req, res) => {
    const hospitalId = req.user.hospitalId;
    const id = req.params.id;
    const body = req.body;
    const updated = await repo.update(hospitalId, id, body);
    res.json(updated);
});
