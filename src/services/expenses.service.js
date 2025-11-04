/* eslint-disable no-return-await */
/* eslint-disable function-paren-newline */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { Category } = require('../models/Category.model');

const getExpenses = async ({ categories, userId, from, to }) => {
  const where = {};

  if (categories) {
    const category = await Category.findOne({ where: { name: categories } });

    if (!category) {
      return [];
    }
    where.categoryId = category.id;
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

  const result = await Expense.findAll({
    where,
    include: [
      {
        model: Category,
        attributes: ['name'],
      },
    ],
  });

  return result;
};

const getExpense = async (id) => {
  return await Expense.findByPk(id, {
    include: [{ model: Category, attributes: ['name'] }],
  });
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  let categoryId = null;

  if (category) {
    const categoryRecord =
      (await Category.findOne({ where: { name: category } })) ||
      (await Category.create({ name: category }));

    categoryId = categoryRecord.id;
  }

  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  const fullExpense = await getExpense(expense.id);

  return fullExpense;
};

const deleteExpense = async (id) => {
  return await Expense.destroy({ where: { id } });
};

const updateExpense = async ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenseToUpdate = await Expense.findByPk(id);

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

  if (spentAt !== undefined) {
    updateFields.spentAt = spentAt;
  }

  if (category !== undefined) {
    const categoryRecord =
      (await Category.findOne({ where: { name: category } })) ||
      (await Category.create({ name: category }));

    updateFields.categoryId = categoryRecord.id;
  }

  await Expense.update(updateFields, { where: { id } });

  return await getExpense(id);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
