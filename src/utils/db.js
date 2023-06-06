'use strict';

const dotenv = require('dotenv');

dotenv.config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', process.env.password, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
