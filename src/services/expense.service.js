const { Op } = require('sequelize');
const { Expense } = require('./../models/Expense.model');

const getAllExpenses = async ({ userId, categories, from, to }) => {
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

  const expList = await Expense.findAll({ where: params });

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

const deleteExpense = async (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
