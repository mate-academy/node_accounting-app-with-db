'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, { foreignKey: 'userId', constraints: false });
Expense.belongsTo(User, { foreignKey: 'userId', constraints: false });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
