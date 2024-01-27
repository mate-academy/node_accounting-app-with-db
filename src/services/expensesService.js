'use strict';

const { Expense } = require('../bd');
const normalizeExpense = ({
  id, userId, title, spentAt, amount, category, note,
}) => {
  return {
    id,
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  };
};

const getExpensesAll = async({ userId, categories, from, to }) => {
  let filterExpenses = await Expense.findAll();

  if (userId) {
    filterExpenses = filterExpenses
      .filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filterExpenses = filterExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from) {
    filterExpenses = filterExpenses.filter(
      (expense) => new Date(expense.spentAt) > new Date(from)
    );
  }

  if (to) {
    filterExpenses = filterExpenses.filter(
      (expense) => new Date(expense.spentAt) < new Date(to)
    );
  }

  return filterExpenses;
};

const getExpensesById = (id) => {
  return Expense.findByPk(id);
};

const createExpenses = (
  userId, spentAt, title, amount, category, note
) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const updateExpenseService = async(
  id, body
) => {
  await Expense.update({ ...body }, { where: { id } });
};

const removeExpensesService = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getExpensesAll,
  getExpensesById,
  createExpenses,
  updateExpenseService,
  removeExpensesService,
  normalizeExpense,
};
