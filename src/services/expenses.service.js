/* eslint-disable no-return-await */
/* eslint-disable function-paren-newline */

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async ({ categories, userId, from, to }) => {
  const where = {};

  if (categories) {
    where.category = categories;
  }

  if (userId) {
    where.userId = userId;
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

  const result = await Expense.findAll({ where });

  return result;
};

const getExpense = async (id) => {
  return await Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpense = async (id) => {
  return await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenseToUpdate = await getExpense(id);

  if (!expenseToUpdate) {
    return null;
  }

  const updateFields = {};

  if (title !== undefined) {
    updateFields.title = title;
  }

  if (note !== undefined) {
    updateFields.note = note;
  }

  if (amount !== undefined) {
    updateFields.amount = amount;
  }

  if (category !== undefined) {
    updateFields.category = category;
  }

  if (spentAt !== undefined) {
    updateFields.spentAt = spentAt;
  }

  await Expense.update(updateFields, { where: { id } });

  const updatedExpense = await getExpense(id);

  return updatedExpense;
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
