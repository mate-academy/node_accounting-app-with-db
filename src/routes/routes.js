'use strict';

const usersRouter = require('./users.routes');
const expensesRouter = require('./expenses.routes');

const initRoutes = (app) => {
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
};

module.exports = initRoutes;
