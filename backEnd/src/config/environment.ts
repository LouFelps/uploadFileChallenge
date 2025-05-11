import { config } from 'dotenv';

const env = process.env.UPLOAD_ENV;

config({ path: `.env.${env}` });

export const api = {
    host: process.env.HOST ?? '0.0.0.0',
    port: Number(process.env.PORT),
  };

export const database = {
    uri: process.env.DATABASE_URI,
  };

export const testDatabase = {
    uri: process.env.MONGO_TEST_URI,
}

export default {env};