'use strict';
import 'dotenv/config';
import Sequelize from 'sequelize';


// Needed for testing purposes, do not remove
// eslint-disable-next-line no-shadow
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export const sequelize = new Sequelize({
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'localhost',
  dialect: 'postgres',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || '123',
});
