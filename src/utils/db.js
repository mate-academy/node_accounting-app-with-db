'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'test1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
