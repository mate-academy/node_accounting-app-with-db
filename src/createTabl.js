/* eslint-disable no-console */
'use strict';

const { sequelize } = require('./db');

require('./models/models');

// eslint-disable-next-line no-unused-expressions
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync();
    console.log('Tablets created');
  } catch (e) {
    console.error('Sync failed:', e);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
})();
