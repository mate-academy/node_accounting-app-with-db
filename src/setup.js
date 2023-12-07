'use strict';

const { Expense } = require('./services/expense.service');
const { User } = require('./services/user.service');

User.hasMany(Expense);
Expense.belongsTo(User, { foreignKey: 'userId' });

User.sync({ force: true });
Expense.sync({ force: true });
