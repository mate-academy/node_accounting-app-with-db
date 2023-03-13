'use strict';

const { Expense } = require('../models/expense');

Expense.sync({ force: true });
