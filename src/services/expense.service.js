/* eslint-disable function-paren-newline */
const {
  models: { Expense },
} = require('../models/models');
const { getNewId } = require('../utils/getNewId');

const get = async (query) => {
  let filteredExpenses = await Expense.findAll();

  if (query) {
    const { userId, categories, from, to } = query;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        categories.includes(expense.category),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }
  }

  return filteredExpenses;
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (newExpenseBody) => {
  const id = getNewId(await get());
  const newExpense = { id, ...newExpenseBody };

  return Expense.create(newExpense);
};

const update = async (id, updatedExpenseBody) => {
  await Expense.update(updatedExpenseBody, { where: { id } });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
