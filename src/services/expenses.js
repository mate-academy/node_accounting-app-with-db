'use strict';

const { Expense } = require('../models/Expense');

const getExpenseById = async(expenseId) => {
  const expense = Expense.findByPk(expenseId);

  return expense;
};

const getAllExpenses = async(searchParams) => {
  const {
    userId,
    categories,
    from,
    to,
  } = searchParams;

  const expenses = await Expense.findAll({
    order: ['createdAt'],
  });

  const filteredExpenses = expenses.filter(expense => {
    if (
      (userId && expense.userId !== Number(userId))
      || (categories && expense.category !== categories)
      || (from && expense.spentAt < from)
      || (to && expense.spentAt > to)
    ) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
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

const deleteExpense = (expenseId) => {
  return Expense.destroy({
    where: {
      id: +expenseId,
    },
  });
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
  getExpenseById,
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  normalize,
};
