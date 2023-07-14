'use strict';
require('dotenv').config();

const { Sequelize } = require('sequelize');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize('postgres', DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
