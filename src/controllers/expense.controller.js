const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const { isValidId } = require('../utils/isValidId');
const { isValidDate } = require('../utils/isValidDate');

const getAll = async (req, res) => {
  res.json(await expenseService.getAll(req.query));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { amount, spentAt, title } = req.body;

  if (!isValidId(id)) {
    return res.sendStatus(400);
  }

  if (!(await expenseService.getById(id))) {
    return res.sendStatus(404);
  }

  if (amount && amount < 0) {
    return res.sendStatus(400);
  }

  if (spentAt && isValidDate(spentAt)) {
    return res.sendStatus(400);
  }

  if (title && !title.trim()) {
    return res.sendStatus(400);
  }

  await expenseService.update(id, req.body);

  res.json(await expenseService.getById(id));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.sendStatus(400);
  }

  if (!(await expenseService.getById(id))) {
    return res.sendStatus(404);
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount } = req.body;

  if (!isValidId(userId)) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(userId);

  if (
    !user ||
    !isValidDate(spentAt) ||
    !title.trim() ||
    !amount ||
    amount < 0
  ) {
    return res.sendStatus(400);
  }

  const newExpense = await expenseService.create(req.body);

  res.status(201).json(newExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
