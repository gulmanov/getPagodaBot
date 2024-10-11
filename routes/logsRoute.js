import express from 'express';
import { getLogs, getLogsByUserId } from '../controllers/logsController.js';

const router = express.Router();

router.get('/logs', getLogs);
router.get('/logs/:user_id', getLogsByUserId);

export default router;
