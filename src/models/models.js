'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

// Define associations
User.hasMany(Expense, { foreignKey: 'userId', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Expense, { foreignKey: 'categoryId', as: 'expenses' });
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
