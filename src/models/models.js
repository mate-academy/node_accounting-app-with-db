'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

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

module.exports = {
  models: {
    User,
    Expense,
  },
};
