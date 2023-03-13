'use strict';

const { User } = require('./models/user');
const { Expense } = require('./models/expense');
const { Category } = require('./models/category');

try {
  User.sync({ alter: true });
  Category.sync({ alter: true });
  Expense.sync({ alter: true });
} catch (error) {
  throw new Error('Database initialization error:' + error.message);
}
