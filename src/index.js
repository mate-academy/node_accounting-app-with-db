/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { initializeDatabase } = require('./db');

const startServer = async () => {
  try {
    await initializeDatabase();

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
