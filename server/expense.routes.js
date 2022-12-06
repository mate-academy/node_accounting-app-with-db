'use strict';

const {
  getTotalExpenses,
  getOneExpense,
  postExpense,
  deleteExpense,
  patchExpense,
} = require('./controllers/expenses');

function InitExpenseRoute(app, { users, expenses }) {
  app.post('/', postExpense);

  app.get('/', getTotalExpenses);

  app.patch('/:id', patchExpense);

  app.get('/:id', getOneExpense(expenses));

  app.delete('/:id', deleteExpense);
}

module.exports = {
  InitExpenseRoute,
};
