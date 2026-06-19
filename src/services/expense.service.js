const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ userId, from, to, categories }) => {
  const where = {};

  if (userId) {
    where.userId = parseInt(userId);
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  const result = await Expense.findAll({
    where,
  });

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const add = (expense) => {
  return Expense.create(expense);
};

const remove = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

const update = async (newExpense) => {
  const expense = await getById(newExpense.id);

  if (!expense) {
    return;
  }

  await expense.update(newExpense);

  return expense;
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
