import { Expense } from './models/Expense.js';
import { User } from './models/User.js';

User.sync();
Expense.sync();
