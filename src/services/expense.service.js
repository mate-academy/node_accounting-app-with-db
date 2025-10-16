const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ userId, from, to, categories } = {}) => {
  const where = {};

  if (userId) {
    where.userId = parseInt(userId);
  }

  if (categories && categories.trim()) {
    const list = categories.split(',').map((c) => c.trim());

    where.category = { [Op.in]: list };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  const expenses = await Expense.findAll({
    where,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    order: [['id', 'ASC']],
    raw: true,
  });

  return expenses;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true,
  });

  return result;
};

const add = async (expense) => {
  const created = await Expense.create(expense);
  const result = created.get({ plain: true });

  delete result.createdAt;
  delete result.updatedAt;

  return result;
};

const remove = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

const update = async (newExpense) => {
  const expense = await Expense.findByPk(newExpense.id);

  if (!expense) {
    return;
  }

  await expense.update(newExpense, { fields: Object.keys(newExpense) });

  const updated = expense.get({ plain: true });

  delete updated.createdAt;
  delete updated.updatedAt;

  return updated;
};

const expenseService = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  expenseService,
};
