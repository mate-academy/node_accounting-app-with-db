/* eslint-disable no-console */
/* eslint-disable no-inner-declarations */
'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

if (require.main === module) {
  const server = createServer().listen(0, () => {
    const { port } = server.address();

    console.log(`http://localhost:${port}/`);
  });

  function cleanUp() {
    server.close(async () => {
      await sequelize.close();
      process.exit(0);
    });
  }

  process.on('SIGTERM', cleanUp);
  process.on('SIGINT', cleanUp);

  process.on('unhandledRejection', (err) => {
    console.error(err);
    cleanUp();
  });

  process.on('uncaughtException', (err) => {
    console.error(err);
    cleanUp();
  });
}

module.exports = { createServer };
