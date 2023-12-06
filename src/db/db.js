'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '9999', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
