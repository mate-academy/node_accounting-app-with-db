'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Z?aTa3dTm#@DYNz', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
