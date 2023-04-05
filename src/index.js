'use strict';

const { createServer } = require('./createServer');

createServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`server was running on http://localhost:3000`);
});
