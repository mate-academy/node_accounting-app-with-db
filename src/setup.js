const { models } = require('./models/models.js');
// const { User } = require('./models/User.model.js');
// const { Expense } = require('./models/Expense.model.js');
const User = models.User;
const Expense = models.Expense;

User.sync({ alter: true });
Expense.sync({ alter: true });
// eslint-disable-next-line no-console
console.log('The table for the User model was just (re)created!');
