/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connection established');
    //   await sequelize.sync({ force: true });
    await sequelize.sync();

    const app = createServer();

    app.listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();

// (async function () {
//   try {
//     await sequelize.authenticate();
//     console.log('DB connection established');

//     await sequelize.sync();

//     const app = await createServer();

//     app.listen(5700, () => {
//       console.log('Server is running on localhost:5700');
//     });
//   } catch (err) {
//     console.error('Failed to start server:', err);
//   }
// })();
