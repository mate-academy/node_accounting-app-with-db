const expensesService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAll(userId, categories, from, to);

  res.status(200).send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount)) {
    return res.sendStatus(400);
  }

  if (isNaN(amount) || amount <= 0) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, note } = req.body;

  if (!id || isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  if (typeof title !== 'string' || !isNaN(amount)) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expensesService.update(
    id,
    title,
    amount,
    category,
    note,
  );

  res.status(200).send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
