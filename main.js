'use strict';

const { createServer } = require('./src/createServer');

createServer()
  .listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on http://localhost:3000');
  });
