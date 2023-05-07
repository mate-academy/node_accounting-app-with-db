'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  '123456789',
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
);

module.exports = {
  sequelize,
};
