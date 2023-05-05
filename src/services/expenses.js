'use strict';

const { Expense } = require('../models/expenses');

const getAll = async(filterOptions) => {
  const expenses = await Expense.findAll();

  const {
    userId,
    categories,
    from,
    to,
  } = filterOptions;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (categories.length) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    const fromDate = Date.parse(from);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAtDate = Date.parse(expense.spentAt);

      return spentAtDate >= fromDate;
    });
  }

  if (to) {
    const toDate = Date.parse(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAtDate = Date.parse(expense.spentAt);

      return spentAtDate <= toDate;
    });
  }

  return filteredExpenses;
};

const getById = async(expenseId) => {
  return Expense.findByPk(expenseId);
};

const create = async(newExpenseData) => {
  return Expense.create(newExpenseData);
};

const removeById = async(expenseId) => {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

const update = async(expenseId, partsToUpdate) => {
  return Expense.update(partsToUpdate, {
    where: {
      id: expenseId,
    },
  });
};

module.exports.service = {
  getAll,
  getById,
  create,
  update,
  removeById,
};
