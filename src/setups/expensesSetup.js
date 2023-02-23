'use strict';

const { Expenses } = require('../models/Expenses');

Expenses.sync({ force: true }).then(r => r());
