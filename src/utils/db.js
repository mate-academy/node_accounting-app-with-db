'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'natali2023', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = {
  sequelize,
};
