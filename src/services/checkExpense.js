'use strict';

const { Expense } = require('../models/Expense');

const expenseInterface = { ...Expense.getAttributes() };

delete expenseInterface.id;
delete expenseInterface.spentAt;

const checkExpense = (expense) => {
  const interfaceKeys = JSON.stringify(Object.keys(expenseInterface).sort());
  const expenseKeys = JSON.stringify(Object.keys(expense).sort());

  return interfaceKeys === expenseKeys;
};

module.exports = { checkExpense };
