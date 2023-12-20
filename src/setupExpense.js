'use strict';

const { Expense } = require('./services/expenses.service');

Expense.sync({ force: true }).then(() => {
  // eslint-disable-next-line no-console
  console.log('Database synchronized successfully');
})
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error synchronizing database:', error);
  });
