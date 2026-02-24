const { Op } = require('sequelize');
const { normalizeExpense } = require('../dto');
const { models } = require('../models/models.js');

const isDateValid = (date) => {
  return date && !isNaN(Date.parse(date));
};

const getAllExpenses = async ({
  userId = null,
  categories = [],
  from = null,
  to = null,
}) => {
  const categoriesArray = Array.isArray(categories) ? categories : [categories];
  const isFromDateValid = isDateValid(from);
  const isToDateValid = isDateValid(to);

  const where = {};
  const includeCategory = {
    model: models.Category,
    as: 'category',
  };

  if (userId) {
    where.userId = userId;
  }

  if (isFromDateValid || isToDateValid) {
    where.spentAt = {};

    if (isFromDateValid) {
      where.spentAt[Op.gte] = from;
    }

    if (isToDateValid) {
      where.spentAt[Op.lte] = to;
    }
  }

  if (categoriesArray.length > 0) {
    includeCategory.where = {
      name: { [Op.in]: categoriesArray },
    };
    includeCategory.required = true;
  }

  const expenses = await models.Expense.findAll({
    where,
    include: [includeCategory],
  });

  return expenses.map(normalizeExpense);
};

const getExpenseById = async (id) => {
  const expense = await models.Expense.findByPk(id, {
    include: [
      {
        model: models.Category,
        as: 'category',
      },
    ],
  });

  if (!expense) {
    return null;
  }

  return normalizeExpense(expense.get({ plain: true }));
};

const createExpense = async (expenseData) => {
  const expense = await models.Expense.create(expenseData);

  if (expense) {
    return getExpenseById(expense.id);
  }

  return null;
};

const removeExpense = async (id) => {
  await models.Expense.destroy({ where: { id } });
};

const updateExpense = async (id, expenseData) => {
  await models.Expense.update(expenseData, { where: { id } });

  return getExpenseById(id);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
