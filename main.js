'use strict';

const { createServer } = require('./src/createServer');

createServer()
  .then(app => app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on localhost:3000');
  }));
