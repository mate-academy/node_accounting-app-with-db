const status = require('../constants/httpStatusCodes');
const expensesService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const query = req.query;
  const expenses = await expensesService.getAllExpenses(query);

  res.send(expenses);
};

const getExpenceById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(status.notFound);

    return;
  }
  res.statusCode = status.successful;
  res.send(expense);
};

const createNewExpense = async (req, res) => {
  const body = req.body;
  const user = await getUserById(body.userId);

  if (!user) {
    res.sendStatus(status.badRequest);

    return;
  }

  const expense = await expensesService.createExpence(body);

  res.statusCode = status.created;
  res.send(expense);
};

const removeExpence = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(status.notFound);

    return;
  }
  await expensesService.deleteExpense(id);
  res.sendStatus(status.noContent);
};

const updateExpenceById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(status.notFound);

    return;
  }

  await expensesService.updateExpence(id, body);

  const updateExpense = await expensesService.getExpenseById(id);

  res.statusCode = status.successful;

  res.send(updateExpense);
};

module.exports = {
  getAllExpenses,
  getExpenceById,
  createNewExpense,
  removeExpence,
  updateExpenceById,
};
