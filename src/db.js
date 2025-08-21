'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');
const { logger } = require('./logger');

// Needed for testing purposes, do not remove
require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const config = require('../config');

const sequelize = new Sequelize({
  database: config.database.database,
  username: config.database.username,
  host: config.database.host,
  dialect: 'postgres',
  port: config.database.port,
  password: config.database.password,
  logging:
    config.server.environment === 'development'
      ? (msg) => logger.info(msg)
      : false,
});

module.exports = {
  sequelize,
};
