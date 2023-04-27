'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '11223344', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
