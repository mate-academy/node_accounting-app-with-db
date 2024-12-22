const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = async (category, userId, from, to) => {
  const whereClause = {};

  if (category) {
    whereClause.category = category;
  }

  if (userId) {
    whereClause.userId = userId;
  }

  if (from || to) {
    whereClause.spentAt = {};

    if (from) {
      whereClause.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      whereClause.spentAt[Op.lte] = new Date(to);
    }
  }

  const result = await Expense.findAll({
    where: whereClause,
  });

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const createExpense = async ({
  userId,
  title,
  amount,
  category,
  note,
  spentAt,
}) => {
  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(newExpense);
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async ({ id, data }) => {
  await Expense.update(data, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  createExpense,
};
