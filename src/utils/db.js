'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config.json');

const { user, host, database, password, dialect } = config.db;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
});

module.exports = {
  sequelize,
};
