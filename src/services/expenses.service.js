const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async ({ userId, categories, from, to }) => {
  const data = {};

  if (userId) {
    data.userId = userId;
  }

  if (categories) {
    data.category = categories;
  }

  if (from && to) {
    data.spentAt = { [Sequelize.Op.between]: [from, to] };
  }

  return Expense.findAll({ where: data });
};

const addExpense = async (data) => {
  return Expense.create(data);
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const updateExpense = async (id, data) => {
  await Expense.update(data, { where: { id } });

  return getExpense(id);
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getExpenses,
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
