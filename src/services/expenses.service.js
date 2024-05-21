/* eslint-disable function-paren-newline */
const { Expense } = require('../models/Expense.model');
const Match = require('../filterExp');

const allExpenses = async (id, categories, from, to) => {
  const fromDate = from
    ? new Date(from).toISOString()
    : new Date(0).toISOString();

  const toDate = to ? new Date(to).toISOString() : new Date().toISOString();
  const result = await Expense.findAll();

  return result.filter((expense) =>
    Match.isExpenseMatch(expense, id, categories, fromDate, toDate),
  );
};

const expenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpenses = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const id = Math.floor(Math.random() * 10000);

  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpenses = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpenses = async (id, body) => {
  await Expense.update(body, { where: { id } });
};

const clearExpenses = async () => {
  return Expense.destroy({ where: {} });
};

module.exports = {
  allExpenses,
  expenseById,
  createExpenses,
  deleteExpenses,
  updateExpenses,
  clearExpenses,
};
//
