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

const isJest = Boolean(process.env.JEST_WORKER_ID);
const hasPostgresConfig = Boolean(
  POSTGRES_HOST ||
    POSTGRES_PORT ||
    POSTGRES_USER ||
    POSTGRES_PASSWORD ||
    POSTGRES_DB,
);

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

let sequelize;

if (isJest && !hasPostgresConfig) {
  sequelize = new Sequelize({
    database: 'postgres',
    username: 'postgres',
    dialect: 'postgres',
    dialectModule: require('pg-mem').newDb().adapters.createPg(),
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    database: POSTGRES_DB || 'postgres',
    username: POSTGRES_USER || 'postgres',
    host: POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    port: POSTGRES_PORT || 5432,
    password: POSTGRES_PASSWORD || '123',
  });
}

module.exports = {
  sequelize,
};
