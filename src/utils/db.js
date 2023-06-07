/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');
const { password } = require('../password');

const dbInit = () => {
  try {
    const db = new Sequelize('postgres', 'postgres', password, {
      host: 'localhost',
      dialect: 'postgres',
    });

    console.log('Connection has been established successfully.');

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { dbInit };
