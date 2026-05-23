/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

async function start() {
  try {
    await sequelize.sync();
    console.log('✅ Database synchronized');

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch {
    console.log('error synchronized');
  }
}
start();
