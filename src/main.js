'use strict';

const { createServer } = require('../src/createServer');

const PORT = 3001;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening port ${PORT}`);
});
