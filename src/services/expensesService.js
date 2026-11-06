const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');
const { Op } = require('sequelize');

async function getAll(filters = {}) {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.categories) {
    where.category = filters.categories;
  }

  if (filters.from && filters.to) {
    where.spentAt = {
      [Op.between]: [new Date(filters.from), new Date(filters.to)],
    };
  }

  const result = await Expense.findAll({ where, order: ['title'] });

  return result;
}

function createExpense(body) {
  return Expense.create({
    userId: body.userId,
    spentAt: body.spentAt,
    title: body.title,
    amount: body.amount,
    category: body.category,
    note: body.note,
  });
}

async function findUser(userId) {
  const user = await User.findByPk(userId);

  return user;
}

function getExpenseById(id) {
  return Expense.findByPk(id);
}

async function deleteExpenseById(id) {
  const deletedExpense = await getExpenseById(id);
  const copy = structuredClone(deletedExpense);

  await Expense.destroy({
    where: {
      id,
    },
  });

  return copy;
}

async function updateExpenseById(id, body) {
  await Expense.update(body, { where: { id } });

  return Expense.findByPk(id);
}

const expensesService = {
  getAll,
  createExpense,
  getExpenseById,
  findUser,
  deleteExpenseById,
  updateExpenseById,
};

module.exports = { expensesService };
