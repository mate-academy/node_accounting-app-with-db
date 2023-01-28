'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const { DB_NAME, DB_USER, DB_HOST, DB_PASS } = process.env;

if (!DB_NAME || !DB_USER || !DB_HOST || !DB_PASS) {
  throw new Error('Cannot create Database');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = { sequelize };
