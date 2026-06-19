const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

Expense.sync({ force: false });
User.sync({ force: false });
