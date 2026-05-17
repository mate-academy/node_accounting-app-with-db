const usersService = require('../services/user.service');
const expensesServices = require('../services/expense.service');

const getAllExpense = async (req, res) => {
  const { categories, from, to, userId } = req.query;

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

  const expenses = await expensesServices.getAllExpense(filters);

  res.status(200).send(expenses);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesServices.getExpenseById(+id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(200).send(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    res.status(400).send('All elements are required');

    return;
  }

  const user = await usersService.getUserById(+userId);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  const newExpense = await expensesServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  const removedExpense = await expensesServices.getExpenseById(+id);

  if (!removedExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  await expensesServices.removeExpense(+id);

  res.status(200).send('Expense removed successfully');
};

const updateExpense = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;

  const findExpense = await expensesServices.getExpenseById(+id);

  if (!findExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  const updatedExpense = await expensesServices.updateExpense(+id, updateData);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpense,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
