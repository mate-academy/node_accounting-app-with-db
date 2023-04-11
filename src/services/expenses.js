'use strict';

const Expense = require('../models/Expense');

const getAll = (filter) => {
  if (filter) {
    return Expense.findAll({
      ...filter,
      order: ['id'],
    });
  }

  return Expense.findAll({
    order: ['id'],
  });
};

const getById = (expenseId) => {
  return Expense.findByPk(Number(expenseId));
};

const create = (expenseData) => {
  return Expense.create({ ...expenseData });
};

const remove = (expenseId) => {
  return Expense.destroy({ where: { id: expenseId } });
};

const update = (expenseId, newExpenseData) => {
  return Expense.update(
    { ...newExpenseData },
    {
      where: {
        id: Number(expenseId),
      },
    },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
