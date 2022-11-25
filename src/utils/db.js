'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '21gizole', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
