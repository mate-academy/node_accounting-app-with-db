'use strict';

const { User } = require('../models/User.js');
const { Expense } = require('../models/Expense.js');
const { Category } = require('../models/Category.js');

User.sync();
Expense.sync();
Category.sync();
