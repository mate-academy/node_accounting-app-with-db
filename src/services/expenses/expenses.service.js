const { Op } = require('sequelize');
const { Expense } = require('../../models/Expense.model');

const create = async (expenseData) => {
  const createdExpense = await Expense.create(expenseData);

  return createdExpense;
};

const getAll = async (query) => {
  const { userId, categories, from, to } = query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: categories.split(',') };
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

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const deleteById = async (id) => {
  const destroyed = await Expense.destroy({ where: { id } });

  return destroyed;
};

const update = async (id, expenseData) => {
  await Expense.update({ ...expenseData }, { where: { id } });

  return getById(id);
};

module.exports = {
  expensesService: {
    getAll,
    getById,
    create,
    deleteById,
    update,
  },
};
