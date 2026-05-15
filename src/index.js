/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const { sequelize } = require('./db');

const app = createServer();
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();
