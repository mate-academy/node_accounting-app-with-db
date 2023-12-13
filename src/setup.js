'use strict';

const { expenseModel } = require('./models/expenseModel');
const { userModel } = require('./models/userModel');

expenseModel.sync({ force: true });
userModel.sync({ force: true });
