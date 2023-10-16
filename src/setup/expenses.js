'use strict';

const { Expenses } = require('../services/expenses.service');

Expenses.sync({ force: true });
