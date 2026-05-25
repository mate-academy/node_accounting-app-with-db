const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');
const { Category } = require('../models/Category.model.js');

const expenseAttributes = [
  'id',
  'userId',
  'spentAt',
  'title',
  'amount',
  'note',
];
const categoryInclude = {
  model: Category,
  attributes: ['name'],
};

const formatExpense = (expense) => {
  if (!expense) {
    return null;
  }

  const { categoryId, Category: cat, ...rest } = expense.toJSON();

  return {
    ...rest,
    category: cat ? cat.name : null,
  };
};

const createExpensesOnce = async (data) => {
  try {
    const { category, ...expenseData } = data;

    if (category) {
      const [cat] = await Category.findOrCreate({
        where: { name: category },
        defaults: { name: category },
      });

      expenseData.categoryId = cat.id;
    }

    const expense = await Expense.create(expenseData);

    const result = await Expense.findByPk(expense.id, {
      attributes: expenseAttributes,
      include: [categoryInclude],
    });

    return formatExpense(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllExpenses = async ({ userId, categories, from, to }) => {
  try {
    const filters = {};

    if (userId) {
      filters.userId = userId;
    }

    if (categories) {
      const cats = await Category.findAll({
        where: { name: categories },
        attributes: ['id'],
        raw: true,
      });

      filters.categoryId = cats.map((c) => c.id);
    }

    if (from || to) {
      filters.spentAt = {};

      if (from) {
        filters.spentAt[Op.gte] = from;
      }

      if (to) {
        filters.spentAt[Op.lte] = to;
      }
    }

    const expenses = await Expense.findAll({
      attributes: expenseAttributes,
      include: [categoryInclude],
      where: filters,
    });

    return expenses.map(formatExpense);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpense = async (id) => {
  try {
    const expense = await Expense.findByPk(id, {
      attributes: expenseAttributes,
      include: [categoryInclude],
    });

    return formatExpense(expense);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOnceExpense = async (id) => {
  try {
    return await Expense.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const patchExpense = async (id, data) => {
  try {
    const { category, ...updateData } = data;

    if (category !== undefined) {
      const [cat] = await Category.findOrCreate({
        where: { name: category },
        defaults: { name: category },
      });

      updateData.categoryId = cat.id;
    }

    return await Expense.update(updateData, {
      where: { id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createExpensesOnce,
  getAllExpenses,
  getExpense,
  deleteOnceExpense,
  patchExpense,
};
