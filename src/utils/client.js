'use strict';

const { Sequelize } = require('sequelize');

const DB_NAME = 'postgres';
const DB_USERNAME = 'postgres';
const DB_PASSWORD = 'artkaspostgre';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
