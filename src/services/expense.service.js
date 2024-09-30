/* eslint-disable function-paren-newline */
const {
  models: { Expense },
} = require('../models/models');

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
  return Expense.create(newExpenseBody);
};

const update = async (id, updatedExpenseBody) => {
  // eslint-disable-next-line no-unused-vars
  const [_, updatedRecords] = await Expense.update(updatedExpenseBody, {
    where: { id },
    returning: true,
  });

  return updatedRecords[0];
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
