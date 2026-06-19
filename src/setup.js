const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

User.sync({ force: true });
Expense.sync({ force: true });
