'use strict';

const { createServer } = require('./createServer');

const { PORT = 3009 } = process.env;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is running on localhost:${PORT}`);
});
