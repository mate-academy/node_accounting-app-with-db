'use strict';

const { createServer } = require('./src/createServer');

createServer()
  .listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on localhost:5000');
  });
