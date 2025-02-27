/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { connectDB } = require('./db');

const startServer = async () => {
  await connectDB();

  createServer().listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
};

startServer();
