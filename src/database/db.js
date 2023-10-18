'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '192347', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
