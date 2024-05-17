/* eslint-disable no-console */

'use strict';

require('dotenv/config');

const { createServer } = require('./createServer');

const PORT = 3006;

const app = createServer();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
