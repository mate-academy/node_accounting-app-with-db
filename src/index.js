/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer.js');
const { setupDatabase } = require('./utils/setupDb.js');

const PORT = 3000;

setupDatabase();

createServer()
  .listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
