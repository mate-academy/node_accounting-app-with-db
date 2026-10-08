'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();

global.TextEncoder = utils.TextEncoder;

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const sequelize = new Sequelize({
  database: PGDATABASE || 'postgres',
  username: PGUSER || 'postgres',
  host: PGHOST || 'localhost',
  dialect: 'postgres',
  port: PGPORT || 5432,
  password: PGPASSWORD || '1234',
});

module.exports = {
  sequelize,
};
