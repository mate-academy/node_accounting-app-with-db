const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async () => {
  return Expense.findAll();
};

const get = async (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

const create = async (expense) => {
  return Expense.create(expense);
};

const update = async (expense) => {
  const { id } = expense;

  await Expense.update({ ...expense }, { where: { id } });
  return Expense.findByPk(id);
};

const filterExpenses = async (params) => {
  const { userId, categories } = params;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.eq]: categories,
    };
  }

  const expenses = await Expense.findAll({
    where,
  });

  return expenses;
};

const expenseService = {
  getAll,
  get,
  remove,
  create,
  update,
  filterExpenses,
};

module.exports = {
  expenseService,
};
