const { Expense } = require('./services/expenses');

Expense.sync({ force: true });
