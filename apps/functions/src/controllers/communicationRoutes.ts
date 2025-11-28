import * as express from 'express';
import { sendBulkMessage } from './communicationController';

const router = express.Router();

router.post('/send', sendBulkMessage);

export const communicationRouter = router;
