'use strict';

const Expenses = require('../models/expenses');

Expenses.sync({ alter: true });
