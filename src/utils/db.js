'use strict';

require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  database: 'postgres',
  username: 'postgres',
  password: '11223344',
  dialect: 'postgres',
  logging: false,
});

module.exports = { sequelize };
