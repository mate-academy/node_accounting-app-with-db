'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const start = async() => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    createServer()
      .listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is running on localhost:${PORT}`);
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed to connect to database', e);
  }
};

start();
