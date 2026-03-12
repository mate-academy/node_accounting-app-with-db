/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./config/db');

require('./models/models');

const app = createServer();

sequelize.sync().then(() => {
  app.listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
});
