'use strict';

const {
  getExpensesForUser,
  getTotalExpenses,
  patchOneExpense,
  getOneExpense,
  postExpense,
  deleteExpense,
} = require('./controllers/expenses');

function InitExpenseRoute(app, { users, expenses }) {
  app.post('/', postExpense);

  app.get('/', getTotalExpenses);

  app.patch('/:id', patchOneExpense(expenses));

  app.get('/:id', getOneExpense(expenses));

  app.delete('/:id', deleteExpense);
}

module.exports = {
  InitExpenseRoute,
};
