'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

const sequelize = new Sequelize({
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || '1234',
  host: POSTGRES_HOST || 'localhost',
  port: POSTGRES_PORT || 5432,
  dialect: 'postgres',
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to DB:', error);
  }
}

connectDB();

module.exports = { sequelize };
