const expensesService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = async (req, res) => {
  res.send(await expensesService.getAll(req.query));
};

const create = async (req, res) => {
  const expense = req.body;

  if (!(await userService.getById(expense.userId))) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = async (req, res) => {
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

  res.send(expense);
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

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  if (!data) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.update(expense, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
