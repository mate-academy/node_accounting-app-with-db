'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

// Додаємо каскадне видалення, щоб тести могли безпечно очищати базу

// User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Expense.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = {
  models: {
    User,
    Expense,
  },
};
