'use strict';

const {
  models: { Expense },
} = require('../models/models');

const getAll = () => {
  return Expense.findAll();
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (expense) => {
  return Expense.create({ ...expense });
};

const update = async ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  return expense.update({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }
  await expense.destroy();

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
