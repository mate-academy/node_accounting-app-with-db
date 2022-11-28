'use strict';

const express = require('express');

const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expense');
const app = express();

function createServer() {
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
}

createServer();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${3000}`);
});

module.exports = {
  createServer,
};
