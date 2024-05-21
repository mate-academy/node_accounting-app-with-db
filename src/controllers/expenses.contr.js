const expensesServ = require('../services/expenses.service');
const usersServ = require('../services/users.service');
const statusCode = require('../utils/statusCode');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const id = Number(userId);

  res.send(await expensesServ.allExpenses(id, categories, from, to));
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesServ.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.OK).send(expense);
};

const getCreateExpense = async (req, res) => {
  const body = req.body;
  const user = usersServ.userById(body.userId);

  if (!user) {
    res.sendStatus(statusCode.BAD_REQUEST);
  }

  res.statusCode = statusCode.CREATED;
  res.send(await expensesServ.createExpenses(body));
};

const getDeleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesServ.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await expensesServ.deleteExpenses(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const getUpdateExpense = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = await expensesServ.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await expensesServ.updateExpenses(id, body);
  res.status(statusCode.OK).send(expense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  getCreateExpense,
  getDeleteExpense,
  getUpdateExpense,
};
