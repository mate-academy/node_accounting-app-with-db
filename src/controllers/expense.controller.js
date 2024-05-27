const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const { Expense } = require('../models/Expense.model');
const STATUS_CODES = require('../constant/statusCode');

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
  const { userId, spentAt, title, amount } = req.body;

  if (!(await userService.getById(userId))) {
    res.sendStatus(STATUS_CODES.badRequest);

    return;
  }

  if (
    !spentAt ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number'
  ) {
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

  const findExpense = await Expense.findByPk(expenseId);

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
