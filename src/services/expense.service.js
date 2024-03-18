'use strict';

const {
  models: { Expense },
} = require('../models/models');

const getAll = async () => {
  const result = await Expense.findAll();

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async (expense) => {
  const result = await Expense.create(expense);

  return result;
};

const update = async (id, updatedExpense) => {
  await Expense.update(updatedExpense, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
