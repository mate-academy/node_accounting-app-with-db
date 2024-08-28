const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.send(expenses.map(expensesService.normalize));
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await usersService.getUser(userId);

  if (userId === undefined || !spentAt || !title || !amount || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expensesService.normalize(newExpense));
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.normalize(expense));
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.removeExpense(id);

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!id || req.body.length === 0) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.updateExpense(id, req.body);

  const newExpense = await expensesService.getExpense(id);

  res.send(expensesService.normalize(newExpense));
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
