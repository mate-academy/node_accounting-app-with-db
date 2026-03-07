import { Category } from './models/Category.js';
import { Expense } from './models/Expense.js';

export async function setup() {
  await Category.sync();
  await Expense.sync();
}
