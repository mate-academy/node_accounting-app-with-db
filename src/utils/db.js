'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Kvitkova7', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
