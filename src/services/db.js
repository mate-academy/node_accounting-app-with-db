'use strict';

const { Sequelize } = require('sequelize');

const DBNAME = 'postgres';
const USERNAME = 'postgres';
const PASS = '30061995';

const sequelize = new Sequelize(DBNAME, USERNAME, PASS, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
