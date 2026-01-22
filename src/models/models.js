'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Expense.hasMany(Category, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
});

Category.belongsTo(Expense, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'CASCUDE',
});

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
