const { User } = require('./models/User.model.js');
const { Expense } = require('./models/Expense.model.js');
const { Category } = require('./models/Category.model.js');

(async () =>
  Promise.all([
    User.sync({ force: true }),
    Expense.sync({ force: true }),
    Category.sync({ force: true }),
  ]))();
