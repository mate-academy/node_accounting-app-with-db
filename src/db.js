'use strict';

const { Sequelize } = require('sequelize');
const {
  database,
  username,
  password,
  DBconfig,
} = require('../config');

const sequelize = new Sequelize(database, username, password, DBconfig);

module.exports = {
  sequelize,
};
