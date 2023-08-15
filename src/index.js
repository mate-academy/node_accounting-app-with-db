'use strict';

const { createServer } = require('./createServer');

createServer().listen(3000, () => {
  /* eslint-disable no-console */
  console.log('Server is running');
});
