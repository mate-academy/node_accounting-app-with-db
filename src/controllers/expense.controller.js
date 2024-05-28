const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const STATUS_CODES = require('../constant/statusCode');
const { validateExpense } = require('../function/validation');

const getAll = async (req, res) => {
  const expense = await expenseService.getAll(req.query);

  res.statusCode = STATUS_CODES.successful;
  res.send(expense);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  res.statusCode = STATUS_CODES.successful;
  res.send(expense);
};

const postExpense = async (req, res) => {
  const { userId } = req.body;

  const validation = await validateExpense(req.body);

  if (!validation.isValid || !(await userService.getById(userId))) {
    return res.sendStatus(STATUS_CODES.badRequest);
  }

  const expense = await expenseService.create(req.body);

  res.statusCode = STATUS_CODES.created;
  res.send(expense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  await expenseService.remove(expense.id);

  return res.sendStatus(STATUS_CODES.noContent);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);
  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  await expenseService.update(id, req.body);

  const findExpense = await expenseService.getById(expenseId);

  res.statusCode = STATUS_CODES.successful;
  res.send(findExpense);
};

module.exports = {
  getAll,
  getById,
  postExpense,
  deleteExpense,
  updateExpense,
};
