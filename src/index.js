'use strict';

const { PORT } = require('./utils/constants');
const { createServer } = require('./createServer');

createServer()
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on localhost: ${PORT}`);
  });
