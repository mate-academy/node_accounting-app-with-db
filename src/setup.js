const { models } = require('./models/models');
const { Expense, User } = models;

await Expense.sync({ force: true });
await User.sync({ force: true });
