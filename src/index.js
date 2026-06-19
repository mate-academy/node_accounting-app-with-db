/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on http://localhost:5700');
});

module.exports = {
  createServer,
};
