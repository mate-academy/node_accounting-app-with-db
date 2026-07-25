'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');

require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DB_SSL,
} = process.env;

const sslOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

const sequelize = new Sequelize({
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'localhost',
  dialect: 'postgres',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || '123',
  dialectOptions: DB_SSL === 'true' ? sslOptions : {},
});

module.exports = {
  sequelize,
};
