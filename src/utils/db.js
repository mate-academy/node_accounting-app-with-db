'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const { DB_NAME, DB_HOST, DB_PASS } = process.env;

if (!DB_NAME || !DB_HOST || !DB_PASS) {
  throw new Error('Cannot create Database');
}

const db = new Sequelize(DB_NAME, DB_NAME, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = { db };
