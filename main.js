'use strict';

const { createServer } = require('./src/createServer');

const PORT = process.env.PORT || 5000;

createServer()
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on localhost:${PORT}`);
  });
