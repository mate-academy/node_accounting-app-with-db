const { Expense } = require('../models/Expense.model');

Expense.sync({ force: true });
