'use strict';

const { Sequelize } = require('sequelize');

const databaseName = 'expenseAppDB';
const databaseUserName = 'postgres';
const databaseUserPass = '1234';
const hostName = 'localhost';

const sequelize = new Sequelize(
  databaseName,
  databaseUserName,
  databaseUserPass,
  {
    host: hostName,
    dialect: 'postgres',
  },
);

exports.sequelize = sequelize;
