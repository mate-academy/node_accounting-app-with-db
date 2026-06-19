const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

// Get all expenses
const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = await expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((e) => e.categoryId === categories);
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.status(200).send(expenses);
};

// Get one expense
const getExpense = async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id))) {
    res.status(400).send('Write correct data');

    return;
  }

  const expense = await expensesService.getExpense(+id);

  if (!expense) {
    res.status(404).send({ message: 'Expense does not exist' });

    return;
  }

  res.status(200).send(expense);
};

// Create new expense
const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, categoryId, note } = req.body;

  if (
    Number.isNaN(+userId) ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof categoryId !== 'number' ||
    typeof note !== 'string' ||
    !(await userService.getUser(+userId))
  ) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const newExpense = await expensesService.createExpenses(req.body);

  res.status(201).send(newExpense);
};

// Update expense
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const numId = Number(id);

  if (Number.isNaN(numId)) {
    return res.status(400).send('Write correct data');
  }

  const existing = await expensesService.getExpense(numId);

  if (!existing) {
    return res.status(404).send('Not found');
  }

  const updatedExpense = await expensesService.updateExpenses(numId, body);

  res.status(200).send(updatedExpense);
};

// Delete expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getExpense(+id)) || Number.isNaN(+id)) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  await expensesService.deleteExpenses(+id);
  res.status(204).send();
};

module.exports = {
  getAll,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
