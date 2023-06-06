'use strict';

const { Sequelize } = require('sequelize');
const { password } = require('../password');

const sequelize = new Sequelize('postgres', 'postgres', password, {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.sync({ force: true });

module.exports = { sequelize };
