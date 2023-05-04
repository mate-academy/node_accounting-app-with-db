'use strict';

const { UserModel } = require('./models/userModel.js');
const { ExpenseModel } = require('./models/expenseModel.js');

UserModel.sync({ force: true });
ExpenseModel.sync({ force: true });
