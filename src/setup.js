const { User } = require('./services/users.service');
const { Expense } = require('./models/Expense.model');

Expense.sync({ force: true });
User.sync({ force: true });
