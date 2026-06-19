/* eslint-disable no-console */

'use strict';
require('dotenv').config();

const { createServer } = require('./createServer');

const serverPort = process.env.SERVER_PORT || 5700;

createServer().listen(serverPort, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is running on localhost:${serverPort}`);
  }
});
