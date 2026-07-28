'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

const originalDestroy = User.destroy;

User.destroy = function (options = {}) {
  if (options && options.truncate) {
    options.cascade = true;
  }

  return originalDestroy.call(this, options);
};

module.exports = {
  models: {
    User,
    Expense,
  },
};
