'use strict';

const { createServer } = require('./helpers/createServer');

const PORT = 3005;
const app = createServer();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`);
});
