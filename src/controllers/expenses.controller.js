const expensesService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const expenses = await expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

const createExpense = async (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  if (!userId || !title || !amount || !category || !note) {
    res.sendStatus(422);

    return;
  }

  const user = await getUserById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expensesService.createExpense(req.body);

  res.status(201).send(newExpense);
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.updateExpense(id, data);

  res.send(await expensesService.getExpenseById(id));
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(id);

  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
