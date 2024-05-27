const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');
const { statusCode } = require('../utils/statusCode');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const id = Number(userId);

  res.send(await expensesService.allExpenses(id, categories, from, to));
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.OK).send(expense);
};

const getCreateExpense = async (req, res) => {
  const body = req.body;
  const user = usersService.userById(body.userId);

  if (!user) {
    res.sendStatus(statusCode.BAD_REQUEST);
  }

  res.statusCode = statusCode.CREATED;
  res.send(await expensesService.createExpenses(body));
};

const getDeleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await expensesService.deleteExpenses(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const getUpdateExpense = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = await expensesService.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await expensesService.updateExpenses(id, body);
  res.status(statusCode.OK).send(expense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  getCreateExpense,
  getDeleteExpense,
  getUpdateExpense,
};
