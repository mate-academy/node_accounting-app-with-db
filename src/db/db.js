'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize('postgres', 'postgres', password, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
