/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const { sequelize } = require('./db');

async function initDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (error) {}
}
initDatabase();

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
