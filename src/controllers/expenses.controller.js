const expensesService = require('./../services/expenses.service.js');
const userService = require('./../services/users.service.js');

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = STATUS_CODES.OK;
  res.send(await expensesService.getAll(userId, categories, from, to));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const expenses = await expensesService.getById(id);

  if (!expenses) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODES.OK;
  res.send(expenses);
};

const post = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount)) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

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

  res.statusCode = STATUS_CODES.CREATED;
  res.send(item);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getById(id))) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!(await expensesService.getById(id))) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const user = await expensesService.change(id, title);

  res.statusCode = STATUS_CODES.OK;
  res.send(user);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
