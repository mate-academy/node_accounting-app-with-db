'use strict';

const { Expenses } = require('../models/expense');

Expenses.sync({ force: true });
