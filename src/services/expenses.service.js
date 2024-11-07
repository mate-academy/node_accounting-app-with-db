const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = async (params) => {
  const { userId, categories, from, to } = params;

  const query = {};

  if (userId) {
    query.userId = userId;
  }

  if (categories) {
    query.category = categories;
  }

  if (from && to) {
    query.spentAt = {
      [Op.gte]: from,
      [Op.lte]: to,
    };
  }

  const filteredExpenses = await Expense.findAll({
    where: query,
  });

  return filteredExpenses;
};

const getById = (id) => Expense.findByPk(id);

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  const expense = await Expense.create(newExpense);

  return expense;
};

const deleteById = (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

const updateById = (keys) => {
  return Expense.update(
    {
      ...keys,
    },
    {
      where: {
        id: keys.id,
      },
    },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
