'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

// User.hasMany(Expense, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Expense.belongsTo(User, {
//   foreignKey: 'userId',
// });

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
