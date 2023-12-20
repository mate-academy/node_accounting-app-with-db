'use strict';

const { Expense } = require('./services/expenses.service');

Expense.sync({ force: true }).then(() => {
  console.log('Database synchronized successfully');
})
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
