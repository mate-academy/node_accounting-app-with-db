'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
  'postgres',
  process.env.LOGIN,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
);

module.exports.sequelize = sequelize;
