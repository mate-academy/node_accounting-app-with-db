'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.USER_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  });

module.exports = {
  sequelize,
};
