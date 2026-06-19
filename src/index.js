/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const PORT = process.env.PORT || 5700;

async function main() {
  const app = createServer();

  const startedApp = await app.start();

  startedApp.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
  });
}

main();
