'use strict';

let expenses = [];
let nextExpenseId = 1;

function getMany(userId, category, from, to) {
  const filteredExpenses = expenses
    .filter(expense => (
      userId ? expense.userId === +userId : expense
    ))
    .filter(expense => (
      category ? expense.category === category : expense
    ))
    .filter(expense => (
      from ? new Date(expense.spentAt) > new Date(from) : expense
    ))
    .filter(expense => (
      to ? new Date(expense.spentAt) < new Date(to) : expense
    ));

  return filteredExpenses;
}

function getOne(expenseId) {
  const foundExpense = expenses.find(({ id }) => +expenseId === id);

  return foundExpense || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpenses = {
    id: nextExpenseId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

function remove(expenseId) {
  const filteredExpenses = expenses.filter(({ id }) => +expenseId !== id);
  const isExpenseFound = expenses.length !== filteredExpenses.length;

  expenses = filteredExpenses;

  return isExpenseFound;
}

function update(userId, body) {
  const foundExpense = expenses.find(({ id }) => +userId === id);

  Object.assign(foundExpense, body);

  return foundExpense;
}

module.exports = {
  getMany,
  getOne,
  create,
  remove,
  update,
};
