'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Mihigi71', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
