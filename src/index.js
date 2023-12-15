/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer');
const { testDB } = require('./utils/db');

require('dotenv').config();

const app = createServer();

app.listen(process.env.PORT, () => {
  testDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
