'use strict';

const { Sequelize } = require('sequelize');

const PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize('postgres', 'postgres', PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
