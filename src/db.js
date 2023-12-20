'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'sofia2004', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
