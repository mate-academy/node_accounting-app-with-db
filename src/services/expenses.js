'use strict';

let expenses = [];

function init() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  if (userId) {
    expenses = [expenses.find(expense => expense.userId === +userId)];
  }

  if (from && to) {
    expenses = expenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to,
    );
  }

  if (category) {
    expenses = expenses.filter(expense => expense.category === category);
  }

  return expenses;
}

function addOne(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: Math.floor(Math.random()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

function getOne(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense;
}

function deleteOne(expenseId) {
  const filteredExpenses = expenses.filter(
    expense => expense.id !== +expenseId
  );

  expenses = filteredExpenses;
}

function updateOne(expenseId, title) {
  const foundExpense = getOne(expenseId);

  return {
    ...foundExpense,
    title,
  };
}

module.exports = {
  init,
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
