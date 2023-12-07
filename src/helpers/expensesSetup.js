'use strict';

const { User } = require('../services/users.service');
const { Expense } = require('../services/expenses.service');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Expense.sync();
