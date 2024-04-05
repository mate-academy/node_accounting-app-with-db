/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

createServer().listen(5701, () => {
  console.log('Server is running on localhost:5701');
});
