'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const { NAME, USER, PASS, HOST } = process.env;

if (!NAME || !USER || !PASS || !HOST) {
  throw new Error('DB hasn`t been created');
}

const sequelize = new Sequelize(NAME, USER, PASS, {
  host: HOST,
  dialect: 'postgres',
});

module.exports = { sequelize };
