/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

require('./models/User.model.js');
require('./models/Expense.model.js');

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (error) {
    console.error(error);
  }
}

start();
