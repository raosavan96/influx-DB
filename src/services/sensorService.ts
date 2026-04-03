import { Point } from '@influxdata/influxdb3-client';
import { databaseName, influxClient } from '../config/influx.js';

export interface SensorData {
    location: string;
    temperature: number;
    humidity: number;
    water_level: number;
}

export const create = async (data: SensorData): Promise<void> => {
    try {
        const point = Point.measurement('weather_station').setTag('location', data.location)
            .setFloatField('temperature', data.temperature)
            .setFloatField('humidity', data.humidity)
            .setFloatField('water_level', data.water_level);

        await influxClient.write(point, databaseName);


        console.log(`✅ Alert: Data saved successfully for location [${data.location}]`);

    } catch (error) {
        console.error('❌ Service Error (InfluxDB):', error);
        throw new Error('Database me data save karne me problem aayi');
    }
}

export const sensors = async (page: number = 1, limit: number = 10): Promise<{ records: SensorData[], total: number }> => {
    try {
        const offset = (page - 1) * limit;

        const countQuery = `SELECT count(temperature) as total FROM "weather_station"`;
        const countResult = await influxClient.query(countQuery, databaseName);
        
        let total = 0;
        for await (const row of countResult) {
            total = Number(row.total) || 0;
            break; 
        }

        const dataQuery = `SELECT * FROM "weather_station" ORDER BY time DESC LIMIT ${limit} OFFSET ${offset}`;
        const queryResult = await influxClient.query(dataQuery, databaseName);

        const records: SensorData[] = [];

        for await (const row of queryResult) {
            records.push({
                location: row.location,
                temperature: row.temperature,
                humidity: row.humidity,
                water_level: row.water_level
            });
        }

        console.log(`✅ Alert: Successfully fetched ${records.length} records for page ${page}`);
        
        return { records, total };

    } catch (error) {
        console.error('❌ Service Error (InfluxDB):', error);
        throw new Error('Database me data get karne me problem aayi');
    }
}