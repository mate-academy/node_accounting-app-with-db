'use strict';

const { createServer } = require('./server/createServer');
const { PORT } = require('./settings');

const app = createServer();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`started on ${PORT}`);
});
