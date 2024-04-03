const expensesService = require('../services/expensesService');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = 200;
  res.send(await expensesService.getAll(userId, categories, from, to));
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const body = req.body;

  const newExpense = await expensesService.create(body);

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  if (newExpense === 'error') {
    res.sendStatus(500);

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await expensesService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.update(id, body);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (expense === 'error') {
    res.sendStatus(500);

    return;
  }

  res.send(expense);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
