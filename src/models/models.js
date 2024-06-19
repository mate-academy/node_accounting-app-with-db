'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

User.hasMany(Expense, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

Expense.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

module.exports = {
  models: {
    User,
    Expense,
  },
};
