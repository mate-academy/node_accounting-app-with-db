'use strict';

const { createServer } = require('./createServer');

const PORT = 3003;

createServer()
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on localhost:${PORT}`);
  });
