'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '0000', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
