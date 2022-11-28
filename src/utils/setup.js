/* eslint-disable no-console */
'use strict';

const { User } = require('../models/User');
const { Expense } = require('../models/Expense');

(async() => {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
})();
