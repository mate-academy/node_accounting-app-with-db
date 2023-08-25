'use strict';

const dotenv = require('dotenv');

dotenv.config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASS,
  {
    host: process.env.PG_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

module.exports = { sequelize };
