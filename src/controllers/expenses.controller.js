const status = require('../constants/httpStatusCodes');
const expensesService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const query = req.query;

  const expenses = expensesService.getAllExpenses(query);

  res.send(expenses);
};

const getExpenceById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(status.notFound);

    return;
  }
  res.statusCode = status.successful;
  res.send(expense);
};

const createNewExpense = (req, res) => {
  const body = req.body;
  const user = getUserById(body.userId);

  if (!user) {
    res.sendStatus(status.badRequest);
  }

  const expense = expensesService.createExpence(body);

  res.statusCode = status.created;

  res.send(expense);
};

const removeExpence = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(status.notFound);

    return;
  }
  expensesService.deleteExpense(id);
  res.sendStatus(status.noContent);
};

const updateExpenceById = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(status.notFound);
  }

  const updatedExpense = expensesService.updateExpence(id, body);

  res.statusCode = status.successful;

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenceById,
  createNewExpense,
  removeExpence,
  updateExpenceById,
};
