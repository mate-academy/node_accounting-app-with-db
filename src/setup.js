const {
  models: { Expense, Category },
} = require('./models/models');

Expense.sync({ force: true });
Category.sync({ force: true });
