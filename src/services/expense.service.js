const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');
const { isValidDate } = require('../utils/isValidDate');

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
      if (!isValidDate(from)) {
        throw new Error('Invalid from date format');
      }
      whereClause.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      if (!isValidDate(to)) {
        throw new Error('Invalid to date format');
      }
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

const update = async (id, data) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return { error: 'Expense not found' };
  }

  const [affectedCount] = await Expense.update(data, {
    where: { id },
  });

  if (affectedCount === 0) {
    return { error: 'Expense not found or no changes made' };
  }

  const updatedExpense = await Expense.findByPk(id);

  return { data: updatedExpense };
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  createExpense,
};
