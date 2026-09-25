/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

async function start() {
  try {
    await sequelize.authenticate();

    console.log(
      'Connection to the database has been established successfully.',
    );

    await sequelize.sync();

    console.log('All models were synchronized successfully.');

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
}

start();
