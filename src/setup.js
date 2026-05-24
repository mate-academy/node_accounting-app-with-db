const { User, Expense, Category } = require('./models');

User.sync({ force: true });
Expense.sync({ force: true });
Category.sync({ force: true });
