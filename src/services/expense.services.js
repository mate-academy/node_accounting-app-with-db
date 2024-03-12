'use strict';

const { Expense } = require('../models/Expense.model');

const getAll = async(params) => {
  let filteredExpenses = await Expense.findAll();
  const { userId, categories, from, to } = params;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories
    );
  }

  if (from && to) {
    const dateFrom = new Date(from);
    const dateTo = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        dateFrom <= new Date(expense.spentAt)
        && new Date(expense.spentAt) <= dateTo
    );
  }

  return filteredExpenses;
};

const getById = async(id) => {
  return Expense.findByPk(id);
};

const create = async(data) => {
  return Expense.create(data);
};

const update = async(id, data) => {
  await Expense.update(
    data,
    {
      where: {
        id,
      },
    }
  );

  return getById(id);
};

const remove = async(id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
