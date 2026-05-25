const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');
const { Category } = require('./Category.model.js');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
});

Expense.belongsTo(Category, { foreignKey: 'categoryId' });

User.addHook('beforeBulkDestroy', (options) => {
  if (options.truncate) {
    options.cascade = true;
  }
});

module.exports = { models: { User, Expense, Category } };
