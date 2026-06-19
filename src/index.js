/* eslint-disable no-console */

'use strict';
require('./setup');

const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
