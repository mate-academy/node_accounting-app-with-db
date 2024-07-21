const express = require('express');
const { ROUTES } = require('./routes');

function createServer() {
  const app = express();

  app.use(express.json());

  // Middleware to set headers
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  // Routes
  const userRoutes = require('./routes/user.route');
  const expensesRoutes = require('./routes/expense.route');

  app.use(ROUTES.USERS, userRoutes);
  app.use(ROUTES.EXPENSES, expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
