'use strict';

const { Sequelize } = require('sequelize');

const DB_NAME = 'postgres';

const sequelize = new Sequelize(DB_NAME, 'postgres', 'oleh', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
