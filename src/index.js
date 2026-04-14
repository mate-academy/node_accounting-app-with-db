/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { initDB } = require('./db');

(async () => {
  await initDB();

  const app = createServer();

  app.listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
})();
