'use strict';

const { createServer } = require('./createServer');

const PORT = process.env.PORT || 8000;

const runServer = async() => {
  const server = await createServer();

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

runServer();
