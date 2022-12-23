'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
