/* eslint-disable no-console */

'use strict';

const { sequelize } = require('./db');

const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();
