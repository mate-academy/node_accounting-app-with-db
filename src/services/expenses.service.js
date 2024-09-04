const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({ where });
};

const getOne = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const updateExpense = async (id, data) => {
  await Expense.update({ ...data }, { where: { id } });

  return Expense.findByPk(id);
};

const removeExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
