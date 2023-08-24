'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'mariia', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
