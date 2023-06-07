/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
'use strict';

const { dbInit } = require('./utils/db.js');
const { User } = require('./models/user.js');
const { Expense } = require('./models/expense.js');

const seedCreateData = async() => {
  await User.bulkCreate([
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'John Smith' },
    { name: 'Jane Smith' },
  ]);

  await Expense.bulkCreate([
    { userId: 1, title: 'Coffee', amount: 2.5, category: 'food', note: 'Starbucks' },
    { userId: 1, title: 'Lunch', amount: 10, category: 'food', note: 'McDonalds' },
    { userId: 1, title: 'Dinner', amount: 20, category: 'food', note: 'Burger King' },
    { userId: 2, title: 'Gas', amount: 40, category: 'transportation', note: 'Shell' },
    { userId: 2, title: 'Groceries', amount: 60, category: 'food', note: 'Walmart' },
    { userId: 2, title: 'Movie', amount: 15, category: 'entertainment', note: 'AMC' },
    { userId: 3, title: 'Gym', amount: 20, category: 'health', note: 'Planet Fitness' },
    { userId: 3, title: 'Coffee', amount: 2.5, category: 'food', note: 'Starbucks' },
    { userId: 3, title: 'Lunch', amount: 10, category: 'food', note: 'McDonalds' },
    { userId: 4, title: 'Dinner', amount: 20, category: 'food', note: 'Burger King' },
    { userId: 4, title: 'Gas', amount: 40, category: 'transportation', note: 'Shell' },
    { userId: 4, title: 'Groceries', amount: 60, category: 'food', note: 'Walmart' },
    { userId: 4, title: 'Movie', amount: 15, category: 'entertainment', note: 'AMC' },
  ]);
};

Expense.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

User.hasMany(Expense, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

const sync = async() => {
  dbInit();

  await User.sync({ force: true });
  await Expense.sync({ force: true });
  await seedCreateData();
};

module.exports = { sync };
