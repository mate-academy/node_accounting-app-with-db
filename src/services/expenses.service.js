const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = async ({ userId, from, to, categories }) => {
  const filterParams = {};

  if (userId) {
    filterParams.userId = userId;
  }

  if (from) {
    filterParams.spentAt = { ...filterParams.spentAt, [Op.gte]: from };
  }

  if (to) {
    filterParams.spentAt = { ...filterParams.spentAt, [Op.lte]: to };
  }

  if (categories) {
    filterParams.category = { [Op.in]: categories.split(',') };
  }

  const expenses = await Expense.findAll({
    where: filterParams,
    order: [['id', 'ASC']],
  });

  return expenses;
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (id, data) => {
  await Expense.update(data, { where: { id } });

  return getById(id);
};

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
};
