/* eslint-disable max-len */
/* eslint-disable no-console */
const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const getAll = async (userId, categories, from, to) => {
  const where = {};

  if (userId !== undefined) {
    where.userId = Number(userId);
  }

  if (categories) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    where.category = { [Op.in]: categoriesArray };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  const expenses = await Expense.findAll({ where });

  return expenses.map((e) => e.toJSON());
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense ? expense.toJSON() : null;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense.toJSON();
};

const remove = async (id) => {
  const result = await Expense.destroy({
    where: { id },
  });

  return result > 0;
};

const update = async ({ id, spentAt, title, amount, category, note }) => {
  const updates = {};

  if (spentAt !== undefined) {
    updates.spentAt = spentAt;
  }

  if (title !== undefined) {
    updates.title = title;
  }

  if (amount !== undefined) {
    updates.amount = amount;
  }

  if (category !== undefined) {
    updates.category = category;
  }

  if (note !== undefined) {
    updates.note = note;
  }

  // Update returns an array: [affectedCount]
  const [affectedCount] = await Expense.update(updates, {
    where: { id },
    returning: true,
  });

  if (affectedCount === 0) {
    return null; // not found
  }

  // fetch updated expense
  const updatedExpense = await Expense.findByPk(id);

  return updatedExpense.toJSON();
};

const clear = async () => {
  await Expense.destroy({ where: {} });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  clear,
  update,
};
