const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (userId, categories, from, to) => {
  const data = {};

  if (userId) {
    data.userId = userId;
  }

  if (categories) {
    data.category = categories;
  }

  if (from && to) {
    data.spentAt = { [Sequelize.Op.between]: [from, to] };
  }

  return Expense.findAll({ where: data });
};

const getById = async (id) => {
  return Expense.findByPk(id);
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

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const change = async (id, title) => {
  await Expense.update({ title }, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  change,
};
