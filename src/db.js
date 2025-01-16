'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');

require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    database: process.env.POSTGRES_DB || 'postgres',
    username: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
    password: process.env.POSTGRES_PASSWORD || '123123',
  },
  test: {
    database: process.env.TEST_POSTGRES_DB || 'postgres',
    username: process.env.TEST_POSTGRES_USER || 'postgres',
    host: process.env.TEST_POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.TEST_POSTGRES_PORT || 5432,
    password: process.env.POSTGRES_PASSWORD || 'postgres',
  },
};

const sequelize = new Sequelize(config[env]);

module.exports = {
  sequelize,
};
