/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db.js');

const PORT = process.env.PORT || 5700;

sequelize
  .sync()
  .then(() => {
    createServer().listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
