/* eslint-disable no-console */

'use strict';

const { createServer } = require('../src/createServer');

createServer()
  .listen(3005, () => {
    console.log('Server is running on localhost:3005');
  });
