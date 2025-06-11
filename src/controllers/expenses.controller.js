const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filters = {};

  if (userId) {
    filters.userId = +userId;
  }

  if (from && to) {
    filters.from = from;
    filters.to = to;
  }

  if (categories) {
    filters.categories = categories;
  }

  const allExpenses = expensesService.getAllExpenses(filters);

  res.status(200).send(allExpenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(+id);

  if (!expense) {
    res.status(404).send('Expense not found.');

    return;
  }

  res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).send('Fill all required fields');

    return;
  }

  const user = usersService.getUserById(+userId);

  if (!user) {
    res.status(400).send('User not found.');

    return;
  }

  const newExpense = expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(+id)) {
    res.status(404).send('Expense not found.');

    return;
  }

  expensesService.removeExpense(+id);
  res.status(204).send('Expense removed successfully.');
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const expense = expensesService.getExpenseById(+id);

  if (!expense) {
    res.status(404).send('Expense not found.');

    return;
  }

  const updatedExpense = expensesService.updateExpense(+id, updateData);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
