import { User } from '../models/User.js';
import { Expense } from '../models/Expense.js';

export async function setupDatabase() {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
};
