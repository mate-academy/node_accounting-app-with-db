'use strict';

const { Expense } = require('../models/Expense.model');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getAll = async () => {
  const result = await Expense.findAll();

  return result.map(normalize);
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense ? normalize(expense) : null;
};

const create = async (userId, spentAt, title, amount, category, note) => {
  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return normalize(expense);
};

const remove = async (id) => {
  const deleted = await Expense.destroy({
    where: { id },
  });

  return deleted > 0;
};

const update = async (id, updates) => {
  const [updated] = await Expense.update(updates, {
    where: { id },
  });

  if (updated) {
    const updatedExpense = await Expense.findByPk(id);

    return normalize(updatedExpense);
  }

  return null;
};

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
