'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_NAME,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.PG_HOST,
  }
);

module.exports = { sequelize };
