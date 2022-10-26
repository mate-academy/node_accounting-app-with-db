'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '775577', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
