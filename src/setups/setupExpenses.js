'use strict';

const { Expense } = require('../models/expense');

Expense.sync({ alter: true });
