'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

// createServer().listen(3000, () => {
//   global.console.log('Server are running');
// });

module.exports = {
  createServer,
};
