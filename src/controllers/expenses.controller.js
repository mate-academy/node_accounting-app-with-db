const { statusCodes } = require('../constants/statusode');
const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');
const validateExpense = require('../utils/getValidateExtense');

const getAll = async (req, res) => {
  res.statusCode = statusCodes.ok;

  const expense = await expensesService.getAll(req.query);

  res.send(expense);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes.not_found);

    return;
  }

  res.statusCode = statusCodes.ok;
  res.send(expense);
};

const createExpenses = async (req, res) => {
  const { userId, spentAt, title, amount, category = '', note = '' } = req.body;

  const user = await usersService.getByUserId(userId);

  if (!user || !validateExpense(req.body)) {
    return res.sendStatus(statusCodes.bad_request);
  }

  const newExpense = await expensesService.createExpenses({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = statusCodes.created;
  res.send(newExpense);
};

const updateExpenses = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes.not_found);

    return;
  }

  const updateExpense = await expensesService.updateExpenses(id, body);

  res.statusCode = statusCodes.ok;
  res.send(updateExpense);
};

const removeExpenses = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(Number(id));

  if (!expense) {
    res.sendStatus(statusCodes.not_found);

    return;
  }

  await expensesService.deleteExpenses(id);

  res.sendStatus(statusCodes.no_content);
};

module.exports = {
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  removeExpenses,
};
