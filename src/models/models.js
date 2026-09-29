'use strict';

const User = require('./User.model');
const Expense = require('./Expense.model');

// Define relationships
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  models: {
    User,
    Expense,
  },
};
