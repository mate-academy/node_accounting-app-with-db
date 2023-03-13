'use strict';

require('dotenv').config();

const { Sequelize } = require('sequelize');

const dbName = process.env.NAME;
const dbUser = process.env.USER;
const dbPassword = process.env.PASSWORD;
const dbHost = process.env.HOST;

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: dbName,
  });

module.exports = {
  sequelize,
};
