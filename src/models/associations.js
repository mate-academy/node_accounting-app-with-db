const { Expense } = require('./Expense.model');
const { User } = require('./User.model');

Expense.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'cascade',
});

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'cascade',
});
