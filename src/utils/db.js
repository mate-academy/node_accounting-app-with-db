'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'ntcn1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
