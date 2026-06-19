const User = require('./User.model');
const Expense = require('./Expense.model');
const Category = require('./Category.model');

// User.hasMany(Expense, { foreignKey: 'user_id', as: 'expenses' });
// Expense.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  User,
  Expense,
  Category,
};
