const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category.model');

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  as: 'expenses',
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});
