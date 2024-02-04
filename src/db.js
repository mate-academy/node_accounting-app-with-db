/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const sequelize = new Sequelize('postgres', 'postgres', '1280', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  (async() => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  })();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = { sequelize };
