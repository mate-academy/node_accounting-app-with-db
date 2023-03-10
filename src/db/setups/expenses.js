'use strict';

const Expenses = require('../models/expenses');

Expenses.sync({ force: true });
