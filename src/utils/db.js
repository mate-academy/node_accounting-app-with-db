'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '123123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
