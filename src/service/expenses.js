'use strict';

const { Expenses } = require('../utils/modules/expenses');

let expenses = [];

const initial = () => (
  expenses = []
);

const getAll = async(category, from, to, userId) => {
  let filteredExpenses = Expenses.findAll();

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.spentAt >= from
      && expense.spentAt <= to);
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.category === category);
  }

  return filteredExpenses;
};

const create = async(userId, spentAt, title, amount, category, note) => {
  const newExpense = await Expenses.create({
    userId, spentAt, title, amount, category, note,
  });

  expenses.push(newExpense);

  return newExpense;
};

const findById = async(expensesId) => {
  return Expenses.findByPk(expensesId);
};

const remove = async(expensesId) => {
  return Expenses.destroy({
    where: { id: expensesId },
  });
};

const change = async(expenseId, filed, title) => {
  const foundExpense = findById(expenseId);

  Expenses.update({
    ...filed, title,
  }, {
    where: { id: expenseId },
  });

  return foundExpense;
};

module.exports = {
  getAll, create, findById, remove, change, initial, Expenses,
};
