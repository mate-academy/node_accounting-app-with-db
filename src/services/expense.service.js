'use strict';

const { getNewId } = require('../utils/getNewId.js');

const { Expense } = require('../models/Expense.js');

const getAll = () => Expense.findAll();

const getById = (id) => (
  Expense.findByPk(id)
);

const create = async(options) => {
  const {
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  } = options;

  const newExpenseId = getNewId(await getAll());

  const newExpense = await Expense.create({
    id: newExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const patch = async(options) => {
  const {
    id,
    ...updates
  } = options;

  const entriesToUpdate = Object.entries(updates)
    .filter(([_, value]) => value);

  const updatesFiltered = Object.fromEntries(entriesToUpdate);

  await Expense.update({ ...updatesFiltered }, {
    where: {
      id,
    },
  });

  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
};
