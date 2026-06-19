const expensesRepository = require('../repositories/expenses.repository');

const getExpenseByIDService = async (expenseId) => {
  const expense = await expensesRepository.getExpenseById(expenseId);

  return expense;
};

const getExpenseByFilterService = async (expenseFilter) => {
  const filteredExpense =
    await expensesRepository.getExpenseByFilter(expenseFilter);

  return filteredExpense;
};

const createExpenseService = async (expenseData) => {
  const newExpense = await expensesRepository.createExpense(expenseData);

  return newExpense;
};

const updateExpenseService = async (expenseData) => {
  const updatedExpense = await expensesRepository.updateExpense(expenseData);

  return updatedExpense;
};

const deleteExpenseService = async (expenseId) => {
  const deletedExpense = await expensesRepository.deleteExpense(expenseId);

  return deletedExpense;
};

const expensesService = {
  getExpenseByIDService,
  getExpenseByFilterService,
  createExpenseService,
  updateExpenseService,
  deleteExpenseService,
};

module.exports = expensesService;
