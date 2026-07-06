const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const normalized = ({ amount, category, id, note, spentAt, title, userId }) => {
  return {
    amount,
    category,
    id,
    note,
    spentAt,
    title,
    userId,
  };
};

const getAll = (userId, categories, from, to) => {
  const where = {};

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

  if (categories) {
    where.category = { [Op.in]: categories.split(',') };
  }

  return Expense.findAll({ where });
};

const create = async (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const getById = async (expensId) => {
  return Expense.findByPk(expensId);
};

const remove = async (expenseId) => {
  return Expense.destroy({ where: { id: expenseId } });
};

const update = async (expenseId, updatedData) => {
  const expense = await Expense.findByPk(expenseId);

  if (!expense) {
    return null;
  }

  return expense.update(updatedData);
};

module.exports = {
  normalized,
  getAll,
  create,
  getById,
  remove,
  update,
};
