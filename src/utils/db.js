'use strict';

const { Sequelize } = require('sequelize');

const DATABASE = 'postgres';
const USERNAME = 'postgres';
const PASSWORD = 'Test1234';

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
