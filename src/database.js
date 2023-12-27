'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Qwer1Asdf2__', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
