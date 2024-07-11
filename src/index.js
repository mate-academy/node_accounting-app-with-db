/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');
const server = createServer();

server.listen(5432, () => {
  console.log('Server is running on localhost:5432');
});

process.on('SIGINT', () => {
  server.close(() => {
    sequelize.end();
    process.exit(0);
  });
});
