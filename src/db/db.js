'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Cdznjckfd2@16', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
