'use strict';

require('dotenv').config();

const { Sequelize } = require('sequelize');

const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'pass';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbName,
});

module.exports = { sequelize };
