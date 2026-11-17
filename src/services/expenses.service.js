/* eslint-disable */
const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

async function getAll({ userId, categories, from, to } = {}) {
  const where = {};

  if (userId) where.userId = userId;
  if (categories) where.category = categories;
  if (from && to) where.spentAt = { [Op.between]: [from, to] };

  return Expense.findAll({ where });
}

function getById(id) {
  return Expense.findByPk(id);
}

function create({ userId, spentAt, title, amount, category, note }) {
  return Expense.create({ userId, spentAt, title, amount, category, note });
}

async function update({ id, ...fields }) {
  await Expense.update(fields, { where: { id } });

  return Expense.findByPk(id);
}

/*
function reset() {
  expenses = [];
  nextId = 1;
}
*/

async function remove(id) {
  await Expense.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  /*   reset,
   */
};
