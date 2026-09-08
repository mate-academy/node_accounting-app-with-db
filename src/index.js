/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

sequelize.sync().then(() => {
  createServer().listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
});
