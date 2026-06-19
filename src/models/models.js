const { sequelize } = require('../db');
const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Categories.model');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

const models = {
  User,
  Expense,
  Category,
};

module.exports = {
  sequelize,
  models,
};
