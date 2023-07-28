'use strict';

const { filterExpenses } = require('../helpers');
const { Expense } = require('../models/expenseModel');

const getFiltered = async(requestQuery) => {
  const expenses = await Expense.findAll();

  return filterExpenses(expenses, requestQuery);
};

const getExpenseById = (expenseId) => (
  Expense.findByPk(Number(expenseId))
);

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => (
  Expense.create({
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    category,
    note: note || null,
  }));

const removeExpense = (expenseId) => (
  Expense.destroy({
    where: {
      id: Number(expenseId),
    },
  }));

const updateExpense = async(expenseId, updateData) => {
  await Expense.update(updateData, {
    where: {
      id: Number(expenseId),
    },
  });

  return getExpenseById(Number(expenseId));
};

module.exports = {
  getFiltered,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
