const { usersRouter } = require('./users.route');
const { expensesRouter } = require('./expenses.route');
const { categoriesRouter } = require('./categories.route');

exports.routes = {
  usersRouter,
  expensesRouter,
  categoriesRouter,
};
