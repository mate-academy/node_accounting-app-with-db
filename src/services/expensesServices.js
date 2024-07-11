/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable max-len */
const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

const normalize = ({ id, name, ...rest }) => {
  return {
    id,
    name,
    ...rest,
  };
};

const getAllExpenses = async ({ categories, from, to, ...query }) => {
  const where = { ...query };

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [new Date(from), new Date(to)] };
  }

  return Expense.findAll({
    where,
  }).then((result) => {
    return result.map((expense) => expense.dataValues);
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (expense) => {
  return Expense.create(expense);
};

const deleteExpenseById = async (id) => {
  return Expense.destroy({ where: { id } });
};

const updateExpenseById = async ({ id, ...rest }) => {
  return Expense.update(rest, { where: { id } }).then(() =>
    Expense.findByPk(id),
  );
};

module.exports = {
  normalize,
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
};
