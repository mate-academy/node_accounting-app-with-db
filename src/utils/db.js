'use strict';

const dotenv = require('dotenv');

dotenv.config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASS,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = { sequelize };
