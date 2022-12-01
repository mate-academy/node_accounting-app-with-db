'use strict';

const {
  getAllExpenses,
  postOneExpense,
  patchOneExpense,
  deleteOneExpense,
  getOneExpense,
} = require('./controllers/expenses');

function InitExpenseRoute(app, { users, expenses }) {
  app.post('/', postOneExpense(expenses, users));

  app.get('/', getAllExpenses(expenses, users));

  app.patch('/:id', patchOneExpense(expenses));

  app.get('/:id', getOneExpense(expenses));

  app.delete('/:id', deleteOneExpense(expenses));
}

module.exports = {
  InitExpenseRoute,
};
