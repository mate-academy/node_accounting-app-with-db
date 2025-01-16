/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const PORT = process.env.PORT || 5700;

createServer().listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
