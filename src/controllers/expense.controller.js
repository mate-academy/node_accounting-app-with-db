const expensesService = require('../services/expense.service.js');
const userService = require('../services/user.service');

const getExpenses = async (req, res) => {
  const { from, to, userId, categories } = req.query;
  const options = {};

  if (from) {
    options.from = from;
  }

  if (to) {
    options.to = to;
  }

  if (userId) {
    options.userId = userId;
  }

  if (categories && !!categories.length) {
    if (Array.isArray(categories)) {
      options.categories = categories;
    } else {
      options.categories = categories.split(',');
    }
  }

  const expenses = await expensesService.getAll(options);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(expense);
};

const create = async (req, res) => {
  const { title, userId, spentAt, amount } = req.body;

  if (!title || !userId || !spentAt || !amount) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(+userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create(req.body);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  res.send(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedTodo = await expensesService.update({ id, body });

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(updatedTodo);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(+id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  create,
  getOne,
  deleteExpense,
  update,
};
