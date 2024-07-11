/* eslint-disable no-console */

'use strict';

const { sequelize } = require('./db');

const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  } finally {
    await sequelize.close();
  }
})();
