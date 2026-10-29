/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

require('./models/associations.js');

async function start() {
  await sequelize
    .authenticate()
    .then(() =>
      console.log('Connection to DB has been established successfully.'))
    .catch((error) =>
      console.error('Unable to connect to the database:', error));

  await sequelize.sync();
}

const server = createServer();

server.listen(5700, () => {
  console.log('Server is running on localhost:5700');
});

process.on('SIGTERM', async () => {
  await sequelize.close();
  server.close();
});

start();
