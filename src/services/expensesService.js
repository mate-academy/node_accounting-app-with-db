const { Expense } = require('../models/Expense.model');

const { Sequelize } = require('sequelize');

const getExpenses = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Sequelize.Op.gte] = from;
    }

    if (to) {
      where.spentAt[Sequelize.Op.lte] = to;
    }
  }

  return Expense.findAll({
    where,
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = async (id) => {
  return Expense.destroy({
    where: { id },
  });
};

const update = async ({ id, title }) => {
  await Expense.update({ title }, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getExpenses,
  getExpenseById,
  create,
  remove,
  update,
};
