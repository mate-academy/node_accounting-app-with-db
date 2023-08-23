'use strict';

const { Sequelize } = require('sequelize');

const DATABASE = 'db';
const USERNAME = 'user';
const PASSWORD = 'pass';

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = {
  sequelize,
};
