'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db.js');

(async () => {
  try {
    await sequelize.sync({ alter: true });

    const server = createServer();
    // eslint-disable-next-line no-console
    server.listen(5700, () => {
      // eslint-disable-next-line no-console
      console.log('Server is running on localhost:5700');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to DB', err);
  }
})();
