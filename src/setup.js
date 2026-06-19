const { models } = require('./models/models');

models.User.sync({ force: true });
models.Expense.sync({ force: true });
