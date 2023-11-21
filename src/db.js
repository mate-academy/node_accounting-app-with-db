'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1945', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
