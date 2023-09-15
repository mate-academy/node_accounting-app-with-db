'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

const HOST_DB = process.env.HOST_DB;
const USER_DB = process.env.USER_DB;
const PASS_DB = process.env.PASS_DB;
const NAME_DB = process.env.NAME_DB;
const DIALECT_DB = process.env.DIALECT_DB;

const sequelize = new Sequelize(NAME_DB, USER_DB, PASS_DB, {
  host: HOST_DB,
  dialect: DIALECT_DB,
});

module.exports = { sequelize };
