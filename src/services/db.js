'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  process.env.USER_NAME,
  process.env.USER_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = {
  sequelize,
};
