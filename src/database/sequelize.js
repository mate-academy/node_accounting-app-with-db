'use strict';

const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres', 'postgres', '8888', {
  host: 'localhost',
  dialect: 'postgres',
});
