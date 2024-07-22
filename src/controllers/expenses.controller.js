const expensesService = require('./../services/expenses.service.js');
const userService = require('./../services/user.service.js');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = 200;
  res.send(await expensesService.getAll(userId, categories, from, to));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expenses = await expensesService.getById(id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const post = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const item = await expensesService.create(
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

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!(await expensesService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await expensesService.change(id, title);

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
