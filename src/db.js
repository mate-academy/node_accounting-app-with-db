'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1337', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
