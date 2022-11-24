'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Vladosik15', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
