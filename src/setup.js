const { User } = require('./models/User.model.js');
const { Expense } = require('./models/Expense.model.js');

User.sync({ force: true });
Expense.sync({ force: true });
