const usersService = require('../services/users.service');
const expensesService = require('../services/expenses.service');

const getAll = async (req, res) => {
  const { from, to } = req.params;
  let { userId, categories } = req.query;

  if (userId) {
    userId = +userId;

    if (isNaN(userId)) {
      res.sendStatus(400);

      return;
    }
  }

  if (categories && !Array.isArray(categories)) {
    categories = [categories];
  }

  if (from) {
    if (isNaN(new Date(from).getTime())) {
      res.sendStatus(400);

      return;
    }
  }

  if (to) {
    if (isNaN(new Date(to).getTime())) {
      res.sendStatus(400);

      return;
    }
  }

  res.send(await expensesService.getAll(userId, categories, from, to));
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
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
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = await expensesService.remove(id);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const create = async (req, res) => {
  const userId = +req.body.userId;
  const amount = +req.body.amount;
  const { spentAt, title, category, note } = req.body;

  if (
    isNaN(userId) ||
    isNaN(amount) ||
    !spentAt ||
    isNaN(new Date(spentAt).getTime()) ||
    !title ||
    (await usersService.getById(userId)) === null
  ) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(
    await expensesService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    ),
  );
};

const update = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  let { userId, amount } = req.body;
  const { spentAt, title, category, note } = req.body;

  if (userId) {
    userId = +userId;

    if (isNaN(userId)) {
      res.sendStatus(400);

      return;
    }
  }

  if (amount) {
    amount = +amount;

    if (isNaN(amount)) {
      res.sendStatus(400);

      return;
    }
  }

  if (spentAt && isNaN(new Date(spentAt).getTime())) {
    res.sendStatus(400);

    return;
  }

  const data = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );

  const result = await expensesService.update(id, cleanedData);

  if (!result[0]) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(result[1][0]);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
