const { Op } = require('sequelize');
const { Expense } = require('./Expense.model.js');

const getAll = async (filters = {}) => {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.from || filters.to) {
    where.spentAt = {};

    if (filters.from) {
      where.spentAt[Op.gte] = new Date(filters.from);
    }

    if (filters.to) {
      where.spentAt[Op.lte] = new Date(filters.to);
    }
  }

  if (filters.categories) {
    const categoryList = Array.isArray(filters.categories)
      ? filters.categories
      : filters.categories.split(',');

    where.category = { [Op.in]: categoryList };
  }

  const expenses = await Expense.findAll({
    where,
    order: [['spentAt', 'ASC']],
  });

  return expenses;
};

const getOne = async (id) => {
  const expense = await Expense.findOne({ where: { id } });

  return expense;
};

const create = async (expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const update = async (id, expense) => {
  await Expense.update(expense, { where: { id } });

  const updatedExpense = await Expense.findOne({ where: { id } });

  return updatedExpense;
};

const deleteById = async (id) => {
  const deletedExpense = await Expense.destroy({ where: { id } });

  return deletedExpense;
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteById,
  update,
};
