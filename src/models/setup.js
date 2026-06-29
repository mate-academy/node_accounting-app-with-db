const { models } = require('./models');

models.Expense.sync({ force: true });
models.User.sync({ force: true });
