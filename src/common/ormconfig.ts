import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from './config';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const config = {
  // name: 'my-connection',
  type: 'postgres',
  synchronize: true,
  logging: false,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  // autoReconnect: true,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectionInterval: 1000,
  entities: [path.join(__dirname, '../entities/*{.ts,.js}')],
  migrations: [path.join(__dirname, '/migration/**/*.ts')],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;