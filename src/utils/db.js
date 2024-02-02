/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

// eslint-disable-next-line max-len
const sequelize = new Sequelize('postgres', 'postgres', `${process.env.DATABASE_PASS}`, {
  host: 'localhost',
  dialect: 'postgres',
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function connection() {
  try {
    await connect();
    await sequelize.sync({ force: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  connection,
  sequelize,
};
