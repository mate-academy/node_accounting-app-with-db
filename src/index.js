/* eslint-disable no-console */
'use strict';

const createServer = require('./createServer');

const PORT = process.env.PORT || 7080;

if (require.main === module) {
  const server = createServer();

  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
  });
}
