'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

module.exports = { sequelize };
