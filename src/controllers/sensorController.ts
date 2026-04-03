import type { Request, Response } from "express";
import { create, sensors, type SensorData } from "../services/sensorService.js";
import { formatPaginatedResponse } from "../utils/paginationHelper.js";


export const createSensor = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: SensorData = req.body;


        if (!data.location || data.temperature === undefined || data.humidity === undefined || data.water_level === undefined) {
            res.status(400).json({
                status: 'error',
                message: 'Incomplete data. Location, temperature, humidity, and water_level are required.'
            });
            return;
        }

        await create(data);

        res.status(201).json({
            status: 'success',
            message: 'Early warning sensor data recorded successfully'
        });

    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message || 'Internal Server Error'
        });
    }
}


export const getSensor = async (req: Request, res: Response): Promise<void> => {
    try {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { records, total } = await sensors(page, limit);

        const paginatedResponse = formatPaginatedResponse(
            total,
            page,
            limit,
            records,
            "sensors",
            "Sensors fetched successfully"
        );

        res.status(200).json(paginatedResponse);
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message || 'Internal Server Error'
        });
    }
}