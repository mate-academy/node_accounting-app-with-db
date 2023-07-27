'use strict';

const { createServer } = require('./createServer');

createServer().listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
