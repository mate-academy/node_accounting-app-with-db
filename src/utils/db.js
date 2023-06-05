'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'password', {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = {
  sequelize,
};
