const { models } = require('./models/models.js');

models.User.sync({ force: true });
models.Expense.sync({ force: true });
