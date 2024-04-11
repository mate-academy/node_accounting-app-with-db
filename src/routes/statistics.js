import * as statisticsControllers from '../controllers/statistics.js';
import express from 'express';

export const router = express.Router();

router.get('/', statisticsControllers.getStats);
