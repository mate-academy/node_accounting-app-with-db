'use strict';

const { createServer } = require('./src/createServer');

require('dotenv').config();

createServer()
  .listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on localhost:${process.env.PORT}`);
  });
