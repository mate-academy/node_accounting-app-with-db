'use strict';

const { Expense } = require('../models/Expense');

Expense.sync({ force: true });
