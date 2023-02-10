'use strict';

const { Expense } = require('../models/expense');

const getAll = () => {
  return Expense.findAll();
};

const getById = (expenseId) => {
  return Expense.findAll({
    where: { id: expenseId },
  });
};

const add = (expenseData) => {
  return Expense.create(expenseData);
};

const update = (expenseId, expenseData) => {
  return Expense.update(expenseData, {
    where: { id: expenseId },
    returning: true,
  });
};

const remove = (expenseId) => {
  Expense.destroy({
    where: { id: expenseId },
  });
};

module.exports = {
  getAll, getById, add, update, remove,
};
