'use strict';

const Expenses = require('../db/models/expenses');

function normalizeExpense({
  userId,
  title,
  category,
  amount,
  spentAt,
  note,
}) {
  return {
    userId,
    title,
    category,
    amount,
    spentAt,
    note,
  };
}

const getAll = async({ userId, from, to, categories }) => {
  const expenses = await Expenses.findAll();

  return expenses.filter(e => {
    const isFilteredByUser = userId
      ? e.userId === +userId
      : true;

    const isFromMatches = from
      ? e.spentAt >= from
      : true;

    const isToMatches = to
      ? e.spentAt <= to
      : true;

    const isFilteredByCategory = categories
      ? categories.includes(e.category)
      : true;

    return isFilteredByUser && isFromMatches
      && isToMatches && isFilteredByCategory;
  });
};

const getById = async(expenseId) => {
  const foundExpense = await Expenses.findByPk(+expenseId);

  return foundExpense;
};

const create = async(expense) => {
  await Expenses.create(expense);
};

const remove = async(expenseId) => {
  await Expenses.destroy({
    where: {
      id: +expenseId,
    },
  });
};

const update = async(expenseId, options) => {
  await Expenses.update(options, {
    where: {
      id: +expenseId,
    },
    returning: true,
  });
};

module.exports = {
  expenseService: {
    normalizeExpense,
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
