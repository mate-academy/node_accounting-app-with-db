const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getAllExpense = async ({ userId, categories, from, to }) => {
  const params = {};

  if (userId) {
    params.userId = userId;
  }

  if (categories) {
    if (Array.isArray(categories)) {
      params.category = { [Op.in]: categories };
    } else {
      params.category = categories;
    }
  }

  if (from || to) {
    params.spentAt = {};

    if (from) {
      params.spentAt[Op.gte] = from;
    }

    if (to) {
      params.spentAt[Op.lte] = to;
    }
  }

  const expList = Expense.findAll({ where: params });

  return expList;
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (data) => {
  return Expense.create(data);
};

const updateExpense = async (
  id,
  { spentAt, title, amount, category, note },
) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return Expense.findByPk(id);
};

const removeExpense = async (id) => {
  return Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getAllExpense,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
