/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

// const {
//   POSTGRES_HOST,
//   POSTGRES_PORT,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_DB,
// } = process.env;

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

// const sequelize = new Sequelize({
//   database: POSTGRES_DB || 'postgres',
//   username: POSTGRES_USER || 'postgres',
//   host: POSTGRES_HOST || 'localhost',
//   dialect: 'postgres',
//   port: POSTGRES_PORT || 5432,
//   password: POSTGRES_PASSWORD || '123',
// });

// module.exports = {
//   sequelize,
// };

// const { Sequelize } = require('sequelize');

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
