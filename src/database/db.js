'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'lzllzl273549', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
