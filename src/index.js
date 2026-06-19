/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

async function startServer() {
  await sequelize.sync({ alter: true });

  const app = createServer();

  app.listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
}

startServer().catch(console.error);
