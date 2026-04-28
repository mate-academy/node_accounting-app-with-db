'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, { foreignKey: 'userId', constraints: false });
Expense.belongsTo(User, { foreignKey: 'userId', constraints: false });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
