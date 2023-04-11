'use strict';

const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
