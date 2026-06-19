const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (filters = {}) => {
  const { userId, from, to, categories } = filters;
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
    where.category = categories;
  }

  return Expense.findAll({ where });
};

async function getById(id) {
  return Expense.findByPk(id);
}

function normalize({ id, title, userId, amount, category, spentAt, note }) {
  return {
    id,
    title,
    userId,
    amount,
    category,
    spentAt,
    note,
  };
}

async function create(userId, spentAt, title, amount, category, note = '') {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function deleteById(id) {
  return Expense.destroy({
    where: { id },
  });
}

async function update({ id, ...newData }) {
  await Expense.update(newData, { where: { id } });

  return getById(id);
}

const expensesService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  normalize,
};

module.exports = {
  expensesService,
};
