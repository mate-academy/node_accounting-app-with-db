/* eslint-disable max-len */
/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const PORT = process.env.PORT || 5700;

const app = createServer();

createServer().listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app };
