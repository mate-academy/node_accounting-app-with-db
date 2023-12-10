'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '35916', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
