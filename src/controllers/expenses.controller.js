const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const getAllExpenses = async (req, res) => {
  const expenses = await expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

const createExpense = async (req, res) => {
  const data = req.body;

  const user = await userService.getUserById(data.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.createExpense(data);

  res.status(201).send(newExpense);
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  const expence = await expensesService.getExpenseById(id);

  if (!expence) {
    res.sendStatus(404);

    return;
  }

  res.send(expence);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.updateExpense(id, data);

  res.send(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expence = await expensesService.getExpenseById(id);

  if (!expence) {
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
