/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer.js');

const PORT = 3000;

createServer()
  .listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
  });
