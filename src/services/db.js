'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgresql', 'postgresql', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
