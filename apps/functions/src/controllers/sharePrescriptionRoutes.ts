import * as express from 'express';
import { sharePrescription } from './sharePrescriptionController';

const router = express.Router();

router.post('/share', sharePrescription);

export const sharePrescriptionRouter = router;
