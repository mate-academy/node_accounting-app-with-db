'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expanseRouter } = require('./routes/expences');

const PORT = process.env.PORT || 3000;

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expanseRouter);

  return app;
}

const server = createServer();

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port - ${PORT}`);
});

module.exports = {
  createServer,
};
