'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await sequelize.sync();

  const app = createServer();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
