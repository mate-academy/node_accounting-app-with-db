'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

Expense.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Expense, { foreignKey: 'userId' });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
