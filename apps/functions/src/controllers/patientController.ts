
import { Router, Response, Request } from 'express';

import { FirebasePatientRepository } from '../repositories/firebasePatientRepository';

import { asyncHandler } from '../utils/asyncHandler';

import AppError from '../utils/AppError';



const repo = new FirebasePatientRepository();

export const patientRouter = Router();



patientRouter.get(

  '/',

  asyncHandler(async (req: Request, res: Response) => {

    const { hospitalId } = req.user;

    const data = await repo.list(hospitalId);

    res.json(data.items);

  })

);



patientRouter.post(

  '/',

  asyncHandler(async (req: Request, res: Response) => {

    const { hospitalId } = req.user;

    const body = req.body;

    const created = await repo.create(hospitalId, body);

    res.status(201).json(created);

  })

);



patientRouter.get(

  '/:id',

  asyncHandler(async (req: Request, res: Response) => {

    const { hospitalId } = req.user;

    const { id } = req.params;

    const p = await repo.getById(hospitalId, id);

    if (!p) throw new AppError('Patient not found', 404);

    res.json(p);

  })

);



patientRouter.put(

  '/:id',

  asyncHandler(async (req: Request, res: Response) => {

    const { hospitalId } = req.user;

    const { id } = req.params;

    const body = req.body;

    const updated = await repo.update(hospitalId, id, body);

    res.json(updated);

  })

);
