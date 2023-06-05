/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer');

const PORT = process.env.PORT || 3000;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
