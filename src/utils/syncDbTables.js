'use strict';

const  {User} = require( "../models/user.model");
const {Expense} = require( "../models/expenses.model");

User.sync({ force: true });
Expense.sync({ force: true });
