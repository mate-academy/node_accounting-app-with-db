'use strict';

const { User } = require('../models/userModel');
const { Expense } = require('../models/expenseModel');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Expense.sync();
