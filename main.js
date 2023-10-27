'use strict';

const dotenv = require('dotenv');

dotenv.config();

const { createServer } = require('./src/createServer.js');

const PORT = process.env.PORT || 8080;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on localhost:${PORT}`);
});
