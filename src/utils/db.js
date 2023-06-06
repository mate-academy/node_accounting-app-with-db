'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'fM&DJ*75Xm', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
