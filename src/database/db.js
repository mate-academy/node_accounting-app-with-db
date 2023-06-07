/* eslint-disable no-console */
'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'Test1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
});

module.exports = {
  sequelize,
};
