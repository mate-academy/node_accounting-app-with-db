const expenseService = require('../services/expenceService.js');
const userService = require('../services/userService.js');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(await expenseService.getAllExpenses(userId, categories, from, to));
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpenceById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.status(200);
  res.json(expense);
};

const createExpance = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  if (!(await userService.getUserById(userId))) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.createExpence(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getExpenceById(id))) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expenseService.patchExpence(id, req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }
  res.status(200).json(updatedExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getExpenceById(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.deleteExpence(id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpance,
  updateExpense,
  removeExpense,
};
