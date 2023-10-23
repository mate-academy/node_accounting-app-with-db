'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'litlit', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
