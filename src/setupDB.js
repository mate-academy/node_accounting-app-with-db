const { Category } = require('./models/Category.model');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

User.sync({ force: true });
Expense.sync({ force: true });
Category.sync({ force: true });
