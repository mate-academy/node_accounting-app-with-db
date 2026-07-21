'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
  constraints: false,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  constraints: false,
});

module.exports = {
  models: {
    User,
    Expense,
  },
};
