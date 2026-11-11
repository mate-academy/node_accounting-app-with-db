const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function getAll(query) {
  const { from, to, categories, userId } = query;
  const where = {};
  const isDateFilter = from && to;

  if (userId) {
    where.userId = userId;
  }

  if (isDateFilter) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  if (categories) {
    where.category = { [Op.in]: categories.split(',') };
  }

  return Expense.findAll({ where });
}

function getById(id) {
  return Expense.findByPk(id);
}

function create(expenseBody) {
  return Expense.create(expenseBody);
}

function deleteById(id) {
  return Expense.destroy({
    where: { id },
  });
}

async function update({ id, expenseBody }) {
  const expense = await getById(id);

  if (!expense) {
    return;
  }

  return Expense.update(expenseBody, { where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
