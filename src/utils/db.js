'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'mateacademy', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
