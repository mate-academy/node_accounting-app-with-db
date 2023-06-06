/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/usersRoute');
const { expensesRouter } = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });

  return app;
}

createServer();

module.exports = {
  createServer,
};
