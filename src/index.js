/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const startServer = async () => {
  try {
    const app = await createServer();

    app.listen(5700, () => {
      // Server started
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
