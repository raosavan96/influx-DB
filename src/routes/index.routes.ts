import { Router } from 'express';
import sensorRoutes from './sensorRoutes.js';

const router = Router();

router.use('/sensors', sensorRoutes);

export default router;