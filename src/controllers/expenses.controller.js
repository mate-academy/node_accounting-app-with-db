const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');

const getExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const result = await expensesService.getAll(userId, categories, from, to);

  const normalizedExpenses = result.map(expensesService.normalized);

  res.status(200).json(normalizedExpenses);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await usersService.getById(userId);

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!newExpense) {
    return res.sendStatus(400);
  }

  return res.status(201).json(expensesService.normalized(newExpense));
};

const getExpenseById = async (req, res) => {
  const expenseId = Number(req.params.id);

  if (Number.isNaN(expenseId)) {
    return res.sendStatus(404);
  }

  const searchedExpense = await expensesService.getById(expenseId);

  if (!searchedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expensesService.normalized(searchedExpense));
};

const deleteExpense = async (req, res) => {
  const expenseId = Number(req.params.id);

  const deletedExpense = await expensesService.remove(expenseId);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const expenseId = Number(req.params.id);

  if (Number.isNaN(expenseId)) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update(expenseId, req.body);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expensesService.normalized(updatedExpense));
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
