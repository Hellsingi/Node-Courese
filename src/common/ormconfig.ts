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
  type: 'postgres',
  synchronize: false,
  logging: false,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [path.join(__dirname, '../modelsDb/*{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/**/*.ts')],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/modelsDb/*{.ts,.js}'
  },
  migrationsRun: true
} as ConnectionOptions;