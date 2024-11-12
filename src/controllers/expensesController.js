/* eslint-disable no-console */
const expenseService = require('../services/expensesServices.js');
const { getById: getUserById } = require('../services/usersServices.js');

const get = async (req, res) => {
  const expenses = await expenseService
    .getAll(req.query)
    .then((exps) => exps.map(expenseService.normalize));

  res.send(expenses);
};

const getOne = (req, res) => {
  const expense = expenseService.normalize(req.entry);

  res.send(expense);
};

const create = async (req, res) => {
  const {
    userId,
    spentAt = new Date(),
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = await getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService
    .create(userId, spentAt, title, amount, category, note)
    .then(expenseService.normalize);

  res.status(201).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.entry;

  await expenseService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.entry;

  await expenseService.update(id, req.body);

  const expense = await expenseService
    .getById(id)
    .then(expenseService.normalize);

  res.send(expense);
};

module.exports = {
  getOne,
  get,
  create,
  remove,
  update,
};
