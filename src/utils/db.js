'use strict';

const { Sequelize } = require('sequelize');
const { DATABASE_CONFIG } = require('../settings');

const { database, username, password, host } = DATABASE_CONFIG;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: database,
});

module.exports = { sequelize };
