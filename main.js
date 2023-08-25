'use strict';

const { createServer } = require('./src/createServer');
const { connect } = require('./utils/db');
const { setup } = require('./utils/setup');

connect().then(setup);

createServer()
  .listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on localhost:3000');
  });
