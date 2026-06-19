const {
  models: { Expense },
} = require('../models/models');

const getExpenseById = async (expenseId) => {
  const expense = await Expense.findOne({
    where: {
      id: expenseId,
    },
  });

  return expense;
};

const getExpenseByFilter = async (expenseFilter) => {
  const filteredExpense = await Expense.findAll({ where: expenseFilter });

  return filteredExpense;
};

const createExpense = async (expenseData) => {
  const newExpense = await Expense.create(expenseData);

  return newExpense;
};

const updateExpense = async (expenseData) => {
  const [updatedRows, updatedData] = await Expense.update(expenseData, {
    where: {
      id: expenseData.id,
    },
    returning: true,
  });

  return updatedRows ? updatedData[0] : null;
};

const deleteExpense = async (expenseId) => {
  const deletedExpense = await Expense.destroy({
    where: {
      id: expenseId,
    },
  });

  return deletedExpense;
};

const expensesRepository = {
  getExpenseById,
  getExpenseByFilter,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = expensesRepository;
