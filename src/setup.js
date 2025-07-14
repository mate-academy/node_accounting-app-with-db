import { Expense } from './models/Expense.model.js';
import { User } from './models/User.model.js';

User.sync({ force: true });
Expense.sync({ force: true });
