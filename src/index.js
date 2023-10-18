'use strict';

const { createServer } = require('./createServer');

createServer().listen(3000, () => {
  /* eslint-disable-next-line */
  console.log('Server runs on 3000 port');
});
