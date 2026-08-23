/* eslint-disable indent */
'use strict';

const Sequelize = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
const dotenv = require('dotenv');

dotenv.config();
global.TextEncoder = utils.TextEncoder;

const {
  DB_URL,
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

const sequelize = DB_URL
  ? new Sequelize(DB_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
      database: POSTGRES_DB || 'postgres',
      username: POSTGRES_USER || 'postgres',
      host: POSTGRES_HOST || 'localhost',
      dialect: 'postgres',
      port: Number(POSTGRES_PORT) || 5433,
      password: POSTGRES_PASSWORD || 'Begemotik12!@',
    });

sequelize.sync();

module.exports = { sequelize };
