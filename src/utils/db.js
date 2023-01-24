'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Dbpefkb7nbrf', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
