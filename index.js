'use strict';

const createServer = require('./src/createServer');
const setupDatabase = require('./src/database/setup');

const PORT = process.env.PORT || 3000;

const server = createServer();

const initApp = async() => {
  await setupDatabase();

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App running in port ${PORT}`);
  });
};

initApp();
