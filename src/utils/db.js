'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  // eslint-disable-next-line no-console
  logging: console.log,
});

module.exports = { sequelize };
