/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

const PORT = 5700;

sequelize.sync({ force: true })
  .then(() => {
    createServer()
      .listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}`);
      });
  })
  .catch(err => console.log('Synchronizing error: ', err));
