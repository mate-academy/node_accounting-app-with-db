'use strict';

const { createServer } = require('./src/createServer');

(async() => {
  const server = await createServer();

  server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on localhost:3000');
  });
})();
