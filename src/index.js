/* eslint-disable no-console */
const createServer = require('./createServer');
const sequelize = require('./db');

const PORT = 3000;

const start = async () => {
  await sequelize.sync();

  const app = createServer();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
