const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async ({ userId, categories, from, to }) => {
  const conditions = {};

  if (userId) {
    conditions.userId = userId;
  }

  if (categories) {
    conditions.category = categories;
  }

  if (from || to) {
    conditions.spentAt = {};

    if (from) {
      conditions.spentAt[Sequelize.Op.gte] = from;
    }

    if (to) {
      conditions.spentAt[Sequelize.Op.lte] = to;
    }
  }

  return Expense.findAll({ where: conditions });
};

const create = ({ userId, title, spentAt, category, amount, note }) => {
  return Expense.create({
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const update = async ({ id, title }) => {
  await Expense.update({ title }, { where: { id } });

  return Expense.findByPk(id);
};

const remove = async (id) => {
  return Expense.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  getExpenses,
  getExpenseById,
  update,
  remove,
};
