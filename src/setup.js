const { User } = require('./services/users.service');
const { Expense } = require('./services/expenses.service');

User.sync({ force: true });
Expense.sync({ force: true });
