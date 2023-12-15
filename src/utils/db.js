/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  testDB,
  sequelize,
};
