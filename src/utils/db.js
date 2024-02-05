'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres',
  'admin', {
    host: 'localhost',
    dialect: 'postgres',
  });

module.exports = sequelize;
