'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

Expense.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Expense, { foreignKey: 'userId' });

module.exports = {
  models: {
    User,
    Expense,
  },
};
