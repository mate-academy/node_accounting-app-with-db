/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

require('dotenv/config');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_LOGIN,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST_NAME,
    dialect: 'postgres',
  }
);

module.exports = {
  sequelize,
};
