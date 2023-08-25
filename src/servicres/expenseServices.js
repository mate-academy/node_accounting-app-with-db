'use strict';

const { Expense } = require('../models/expense');

const getAllExpenses = async(searchParams) => {
  const {
    userId,
    categories,
    from,
    to,
  } = searchParams;

  const expenses = await Expense.findAll();

  let foundExpenses = expenses;

  if (userId) {
    foundExpenses = foundExpenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    foundExpenses = foundExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    foundExpenses = foundExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  return foundExpenses;
};

const getExpenseById = async(expenseId) => {
  const expense = Expense.findByPk(expenseId);

  return expense;
};

const deleteExpense = (expenseId) => {
  return Expense.destroy({
    where: {
      id: +expenseId,
    },
  });
};

const addExpense = async(expenseData) => {
  const expense = await Expense.create({ expenseData });

  return expense;
};

const updateExpense = (expenseId, expenseData) => {
  const expense = Expense.update({ expenseData }, {
    where: {
      id: +expenseId,
    },
  });

  return expense;
};

const normalize = (expense) => ({
  id: expense.id,
  userId: expense.userId,
  spentAt: expense.spentAt,
  title: expense.title,
  amount: expense.amount,
  category: expense.category,
  note: expense.note,
});

module.exports = {
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  addExpense,
  updateExpense,
  normalize,

};
