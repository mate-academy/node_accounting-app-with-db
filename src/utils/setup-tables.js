import { Expense } from '../expense/expense-model.js';
import { User } from '../users/user-model.js';

export const syncAllTables = async () => {
  await User.sync();
  await Expense.sync();
  console.log("\t\t *** Setup is done! ***\n");
};


