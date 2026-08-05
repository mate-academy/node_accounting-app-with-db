/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

require('./models/models');

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Database connected');

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error(error);
  }
}

start();
