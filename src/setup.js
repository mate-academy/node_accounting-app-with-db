const {
  models: { User, Expense },
} = require('./models/models.js');

User.sync({ force: true });
Expense.sync({ force: true });
