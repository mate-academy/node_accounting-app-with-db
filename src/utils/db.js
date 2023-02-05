'use strict';

const { Sequelize } = require('sequelize');
const dbParams = require('./dbParams');

const sequelize = new Sequelize(
  dbParams.dbName,
  dbParams.dbUsername,
  dbParams.dbPassword,
  {
    host: 'localhost',
    dialect: dbParams.dbName,
  }
);

module.exports = { sequelize };
