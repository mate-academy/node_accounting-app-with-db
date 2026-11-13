const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

(async () => {
  await User.sync();
  await Expense.sync();
})();
