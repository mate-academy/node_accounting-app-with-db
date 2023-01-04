'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '52591011', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
