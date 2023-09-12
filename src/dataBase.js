'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'test1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
  DataTypes,
};
