'use strict';

const { createServer } = require('./createServer');

createServer()
  .listen(3000, () => {
    global.console.log('Server is running on 3000 port');
  });
