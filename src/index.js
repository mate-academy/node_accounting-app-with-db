/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

(async () => {
  const server = await createServer();

  server.listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
})();
