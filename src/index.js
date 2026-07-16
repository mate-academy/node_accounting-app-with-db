/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5700;

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    createServer().listen(PORT, () => {
      console.log(`Server is running on localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
