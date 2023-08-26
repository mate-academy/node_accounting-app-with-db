/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

const HOST_NAME = 'localhost';
const DATABASE_NAME = 'accounting_app';
const DATABASE_LOGIN = 'postgres';
const DATABASE_PASSWORD = 'nalunaIlona';
const DATABASE_DIALECT = 'postgres';

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_LOGIN,
  DATABASE_PASSWORD,
  {
    host: HOST_NAME,
    dialect: DATABASE_DIALECT,
  }
);

module.exports = {
  sequelize,
};
