'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'test', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
