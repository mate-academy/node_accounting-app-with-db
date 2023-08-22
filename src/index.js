'use strict';

const { creatServer } = require('./createServer');

creatServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on http://localhost:3000');
});
// console.log('Start');
