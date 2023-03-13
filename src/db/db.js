'use strict';

const { Sequelize } = require('sequelize');
const { DB_PASSWORD, DB_HOST, DB_USER, DB_NAME } = process.env;

require('dotenv').config();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };
