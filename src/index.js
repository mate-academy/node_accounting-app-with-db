'use strict'

require('dotenv/config');

const { createServer } = require('./createServer');

const port = process.env.PORT || 5000;

createServer().listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`);
});
