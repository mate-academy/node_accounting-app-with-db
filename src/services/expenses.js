'use strict';

const { Expense } = require('../models/expenses');

const getAllExpenses = (userId, category, from, to) => {
  let filteredExpenses = Expense.findAll();

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};

const getExpensesById = (expenseId) => {
  const neededExpenses = Expense.findByPk(expenseId);

  return neededExpenses;
};

const addExpense = async(reqBody) => {
  const { userId, spentAt, title, amount, category, note } = reqBody;

  const allExpenses = await Expense.findAll({ order: ['id'] });

  const maxId = Math.max(...allExpenses.map(user => user.id));

  const id = allExpenses.length ? maxId + 1 : 0;

  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpense = (expenseId) => {
  return Expense.destroy({
    where: { id: Number(expenseId) },
  });
};

const updateExpense = (foundExpense, reqBody) => {
  const { userId, spentAt, title, amount, category, note } = reqBody;

  const id = foundExpense.id;

  return Expense.update({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: { id },
    returning: true,
    plain: true,
  });
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  addExpense,
  deleteExpense,
  updateExpense,
};
