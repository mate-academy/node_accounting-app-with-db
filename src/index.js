/* eslint-disable prettier/prettier */
'use strict';

const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:5700');
});
