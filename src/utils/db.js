'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'voitel_rulid', {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = {
  sequelize,
};
