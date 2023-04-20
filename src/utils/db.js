'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

module.exports = { sequelize };
