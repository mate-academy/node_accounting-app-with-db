'use strict';

const {
  getTotalExpenses,
  postExpense,
  deleteExpense,
  patchExpense,
} = require('./controllers/expenses');

function InitExpenseRoute(app) {
  app.post('/', postExpense);

  app.get('/', getTotalExpenses);

  app.patch('/:id', patchExpense);

  app.delete('/:id', deleteExpense);
}

module.exports = {
  InitExpenseRoute,
};
