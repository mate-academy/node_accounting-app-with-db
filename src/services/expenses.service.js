const { Op } = require('sequelize');
const { Expense } = require('../models');

const normalize = ({ id, userId, title, amount, spentAt, category, note }) => ({
  id,
  userId,
  title,
  amount,
  spentAt,
  category,
  note,
});

const create = async (payload) => {
  const expense = await Expense.create({ ...payload });

  return expense;
};

const getAll = async (params = {}) => {
  const { userId, categories, from, to } = params;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories && categories.length > 0) {
    where.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  const expenses = await Expense.findAll({ where });

  return expenses;
};

const getOne = (id) => {
  const expense = Expense.findByPk(id);

  return expense;
};

const update = async (id, payload) => {
  // eslint-disable-next-line no-unused-vars
  const [_expensesUpdated, [updatedExpense]] = await Expense.update(payload, {
    where: { id },
    returning: true,
  });

  return updatedExpense;
};

const remove = async (id) => {
  const expensesRemoved = await Expense.destroy({ where: { id } });

  return expensesRemoved;
};

const expensesService = {
  normalize,
  create,
  getAll,
  getOne,
  update,
  remove,
};

exports.expensesService = expensesService;
