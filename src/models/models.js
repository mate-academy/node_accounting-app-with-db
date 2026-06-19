'use strict';

const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');
const { Category } = require('./Category.model.js');

User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Expense, { foreignKey: 'categoryId', as: 'expenses' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
