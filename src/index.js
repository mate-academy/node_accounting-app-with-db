/* eslint-disable no-console */

'use strict';

const { sequelize } = require('./db');

require('./models/models');

const { createServer } = require('./createServer');

sequelize.sync().then(() => {
  createServer().listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
});
