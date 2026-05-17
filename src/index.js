/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

createServer().listen(8080, () => {
  console.log('Server is running on localhost:8080 ');
});
