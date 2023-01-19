'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Test123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
