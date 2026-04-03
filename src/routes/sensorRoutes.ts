import { Router } from 'express';
import { createSensor, getSensor } from '../controllers/sensorController.js';

const sensorRoutes = Router();

sensorRoutes.post('/create', createSensor);
sensorRoutes.get('/', getSensor)

export default sensorRoutes;