const { User } = require('../models/User.model.js');
const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

async function getAll(filters) {
  const where = {};

  if (filters.userId) {
    where.userId = Number(filters.userId);
  }

  if (filters.categories) {
    where.category = filters.categories;
  }

  if (filters.from && filters.to) {
    where.spentAt = {
      [Op.gte]: new Date(filters.from),
      [Op.lte]: new Date(filters.to),
    };
  }

  return Expense.findAll({ where });
}

async function getById(id) {
  return Expense.findByPk(id);
}

async function create({ userId, amount, spentAt, title, category, note }) {
  if (!(await User.findByPk(userId))) {
    return null;
  }

  const newExpense = await Expense.create({
    userId,
    amount,
    spentAt,
    title,
    category,
    note,
  });

  return newExpense;
}

async function update(id, changes) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, changes);

  await expense.save();

  return expense;
}

async function remove(id) {
  const deleteCount = await Expense.destroy({ where: { id } });

  return deleteCount > 0;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
