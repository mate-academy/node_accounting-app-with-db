import { User } from './src/db/models/user.js';
import { Expense } from './src/db/models/expenses.js';

(async() => {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
})();
