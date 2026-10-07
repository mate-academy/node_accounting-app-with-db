const { Expense } = require('../models/Expense.model');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

async function getAllExpenses() {
  const result = await Expense.findAll();

  return result;
}

async function getExpenseById(id) {
  return Expense.findByPk(id);
}

async function createExpense(newExpense) {
  const expense = await Expense.create(newExpense);

  return expense;
}

async function deleteExpense(id) {
  await Expense.destroy({ where: { id } });
}

async function updateExpense({ id, ...params }) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  const updatedExpense = await expense.update(params, { silent: true });

  return updatedExpense;
}

module.exports = {
  normalize,
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
