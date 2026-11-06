/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer.js');

createServer().listen(7080, () => {
  console.log('Server is running on localhost:7080');
});
