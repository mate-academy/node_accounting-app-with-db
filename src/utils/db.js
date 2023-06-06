'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'igor210295', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
