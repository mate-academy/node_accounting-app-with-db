'use strict';

const { Expense } = require('../models/Expense.model');

const getAll = () => {
  return Expense.findAll();
};

const getByID = (id) => {
  return Expense.findByPk(id);
};

const create = ({ userId, title, amount, category, note, spentAt }) => {
  const expense = {
    userId,
    spentAt: spentAt ? new Date(spentAt) : new Date(),
    title,
    amount,
    category,
    note,
  };

  return Expense.create(expense);
};

const update = async (id, updateFields) => {
  await Expense.update(updateFields, { where: { id } });

  return getByID(id);
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
