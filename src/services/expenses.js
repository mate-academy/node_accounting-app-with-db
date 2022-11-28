'use strict';

const { Expense } = require('../utils/models/Expense');

const getFilteredExpenses = async(searchParams) => {
  const {
    userId,
    category,
    from,
    to,
  } = searchParams;

  const expenses = await Expense.findAll();

  return expenses
    .filter(expense => {
      if (userId && expense.userId !== +userId) {
        return;
      }

      if (category && category !== expense.category) {
        return;
      }

      if (from && new Date(expense.spentAt) < new Date(from)) {
        return;
      }

      if (to && new Date(expense.spentAt) > new Date(to)) {
        return;
      }

      return true;
    });
};

const getExpenses = () => {
  return Expense.findAll();
};

const addExpense = (expenseData) => {
  return Expense.create(expenseData);
};

const getOneExpense = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const deleteExpense = (expenseId) => {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

const changeExpense = async(expenseId, expenseData) => {
  const foundedExpense = await Expense.findByPk(expenseId);

  await foundedExpense.update(expenseData);

  return foundedExpense.save();
};

module.exports = {
  getFilteredExpenses,
  getExpenses,
  addExpense,
  getOneExpense,
  deleteExpense,
  changeExpense,
};
