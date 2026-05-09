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

const sequelize = new Sequelize(
  POSTGRES_DB || 'postgres',
  POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD || '123123',
  {
    host: POSTGRES_HOST || 'localhost',
    port: POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  },
);

module.exports = {
  sequelize,
};
