const { models } = require('./models/models');
const { Expense, User } = models;

Expense.sync({ force: true });
User.sync({ force: true });
