/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

const PORT = process.env.SERVER_PORT || 5700;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync();

    createServer().listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
