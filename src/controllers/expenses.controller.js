const expensesService = require('../services/expenses.service');
const { getUser } = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const query = req.query;
  const expenses = await expensesService.getExpenses(query);

  res.send(expenses);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const createNewExpense = async (req, res) => {
  const body = req.body;
  const user = await getUser(body.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.createExpense(body);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpenseById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.updateExpense(expense.id, body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const deleteExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(expense.id);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  updateExpenseById,
  deleteExpenseById,
};
