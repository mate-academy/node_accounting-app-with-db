'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_NAME,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost',
  }
);

module.exports = { sequelize };
