'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

// Додаємо каскадне видалення, щоб тести могли безпечно очищати базу

User.hasMany(Expense, { foreignKey: 'userId', constraints: false });

Expense.belongsTo(User, { foreignKey: 'userId', constraints: false });

module.exports = {
  models: {
    User,
    Expense,
  },
};
