/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');

    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });
