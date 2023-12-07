'use strict';

require('dotenv').config();

const { createServer } = require('./src/createServer');

createServer()
  .listen(3005, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on localhost:3005');
  });
