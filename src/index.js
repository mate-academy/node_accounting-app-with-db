/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

createServer().listen(5242, () => {
  console.log('Server is running on localhost:5242');
});
