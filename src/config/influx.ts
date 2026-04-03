import { InfluxDBClient } from '@influxdata/influxdb3-client';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.INFLUX_URL || '';
const token = process.env.INFLUX_TOKEN || '';

export const influxClient = new InfluxDBClient({ host: url, token: token });
export const databaseName = process.env.INFLUX_DATABASE || 'flood-db';