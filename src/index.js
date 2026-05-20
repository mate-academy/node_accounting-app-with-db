/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    return createServer().listen(5700, () => {});
  });
