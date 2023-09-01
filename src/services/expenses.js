'use strict';

const { Expense } = require('../models/Expense');

const create = (expense) => {
  return Expense.create(expense);
};

const getAll = (filters) => {
  return Object.values(filters).length
    ? Expense.findAll({
      where: filters,
    })
    : Expense.findAll();
};

const getById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const remove = (expenseId) => {
  Expense.destroy({
    where: { id: expenseId },
  });
};

const update = (expenseId, data) => {
  return Expense.update(data, {
    where: { id: expenseId },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
