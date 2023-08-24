/* eslint-disable no-console */
'use strict';

const createServer = require('./createServer.js');

const app = createServer();

app.listen(3000, () => {
  createServer();
  console.log('Server is running on http://localhost:3000');
});
