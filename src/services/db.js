'use strict';

const { Sequelize } = require('sequelize');

const USERNAME = 'postgres';
const PASSWORD = 'postgres';

const sequelize = new Sequelize('postgres', USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
