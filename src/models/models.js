'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  as: 'expenses',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  as: 'expenses',
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

async function syncModels() {
  await User.sync({ alter: true });
  await Category.sync({ alter: true });
  await Expense.sync({ alter: true });
}

module.exports = {
  User,
  Expense,
  Category,
  syncModels,
  // Export models object for compatibility with existing tests
  models: {
    User,
    Expense,
    Category,
  },
};
