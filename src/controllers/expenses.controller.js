const expensesService = require('./../services/expenses.service.js');
const userService = require('./../services/user.service.js');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = 200;
  res.send(expensesService.getAll(userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.statusCode = 400;

    res.end();
  }

  const expenses = expensesService.getById(id);

  if (!expenses) {
    res.statusCode = 404;

    res.end();
  }

  res.statusCode = 200;
  res.send(expenses);
};

const post = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount && category && note)) {
    res.statusCode = 400;

    res.end();
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const item = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(item);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.statusCode = 404;

    res.end();
  }

  expensesService.remove(id);

  res.statusCode = 204;
  res.end();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!expensesService.getById(id)) {
    res.statusCode = 404;

    res.end();
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = expensesService.change(id, title);

  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
