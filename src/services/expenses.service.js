const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

async function getAll(req) {
  const { userId, categories, from, to } = req.query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  const expense = await Expense.findAll({ where });

  return expense;
}

async function getOne(id) {
  return Expense.findByPk(id);
}

async function createOne(expense) {
  return Expense.create(expense);
}

async function updateOne(
  id,
  { userId, spentAt, title, amount, category, note },
) {
  await Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return getOne(id);
}

async function deleteOne(id) {
  return Expense.destroy({ where: { id } });
}

module.exports = {
  Expense,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
