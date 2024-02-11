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

// eslint-disable-next-line
console.info(`
POSTGRES_HOST = ${POSTGRES_HOST || 'localhost'},
POSTGRES_PORT = ${POSTGRES_PORT || 5432},
POSTGRES_USER = ${POSTGRES_USER || 'postgres'},
POSTGRES_PASSWORD = ${POSTGRES_PASSWORD || '123'},
POSTGRES_DB = ${POSTGRES_DB || 'postgres'},
`);

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

const sequelize = new Sequelize({
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'localhost',
  dialect: 'postgres',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || '123',
});

module.exports = {
  sequelize,
};
