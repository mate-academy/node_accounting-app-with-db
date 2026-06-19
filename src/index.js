/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

(async () => {
  await sequelize.sync();

  createServer().listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
})();
