/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

const startServer = async () => {
  try {
    await sequelize.authenticate();

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
