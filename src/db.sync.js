const { init: userInit } = require('./services/usersService');
const { init: expenseInit } = require('./services/expensesService');

userInit();
expenseInit();
