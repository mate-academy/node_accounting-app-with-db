'use strict';

const { createServer } = require('./createServer');
const { PORT } = require('./utils/constants');

async function start() {
  const server = await createServer();

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server started');
  });
}

start();
