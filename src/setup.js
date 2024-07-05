const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

Expense.sync({ force: true });
User.sync({ force: true });
