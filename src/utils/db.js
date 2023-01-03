'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'qwertyuiop', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
