'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '3658', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
  DataTypes,
};
