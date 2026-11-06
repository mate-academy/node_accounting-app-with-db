const { models } = require('./models/models');
const { Expense, User } = models;

(async () => {
  await Expense.sync({ force: true });
  await User.sync({ force: true });
})();
