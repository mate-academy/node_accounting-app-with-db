'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',
});
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
