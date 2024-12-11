const { getExpensesFilterQuerry } = require('../utils/expenses');

const { Expense } = require('../models/Expense.model');

const getExpenses = async (categories, userId, from, to) => {
  const where = getExpensesFilterQuerry(categories, userId, from, to);

  const expenses = await Expense.findAll({ where });

  return expenses;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = async (expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const removeExpense = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async (id, valuesToUpdate) => {
  await Expense.update(valuesToUpdate, { where: { id } });

  const updatedExpense = await getExpenseById(id);

  return updatedExpense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
