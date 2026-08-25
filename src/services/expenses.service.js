const { Op } = require('sequelize');
const Expense = require('../models/Expense.model.js').Expense;

function getAll({ userId, from, to, categories } = {}) {
  const where = {};

  if (userId !== undefined) {
    where.userId = userId;
  }

  if (from || to) {
    where.spentAt = {
      ...(from && { [Op.gte]: from }),
      ...(to && { [Op.lte]: to }),
    };
  }

  if (categories) {
    where.category = categories;
  }

  return Expense.findAll({ where });
}

function getById(id) {
  return Expense.findByPk(id);
}

function create({ userId, spentAt, title, amount, category, note = '' }) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

function deleteById(id) {
  return Expense.destroy({
    where: { id },
  });
}

async function update({ id, ...changes }) {
  const [, [expense]] = await Expense.update(changes, {
    where: { id },
    returning: true,
  });

  return expense || null;
}

const expensesService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};

module.exports = { expensesService };
