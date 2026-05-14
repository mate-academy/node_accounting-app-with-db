/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const server = createServer();

server.listen(5700, async () => {
  console.log('Server is running on localhost:5700');
});
