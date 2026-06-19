const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = async (req, res, next) => {
  const { userId, categories, from, to } = req.query;

  let result = await expenseService.get();

  if (userId != null) {
    const uid = Number(userId);

    if (Number.isNaN(uid)) {
      return res.sendStatus(400);
    }
    result = result.filter((e) => e.userId === uid);
  }

  if (categories != null) {
    const cats = Array.isArray(categories) ? categories : [categories];

    result = result.filter((e) => cats.includes(e.category));
  }

  if (from != null) {
    const fromTs = new Date(from).getTime();

    if (Number.isNaN(fromTs)) {
      return res.sendStatus(400);
    }

    result = result.filter((e) => new Date(e.spentAt).getTime() >= fromTs);
  }

  if (to != null) {
    const toTs = new Date(to).getTime();

    if (Number.isNaN(toTs)) {
      return res.sendStatus(400);
    }

    result = result.filter((e) => new Date(e.spentAt).getTime() <= toTs);
  }

  res.send(result);
};

const create = async (req, res, next) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId == null || spentAt == null || title == null || amount == null) {
    return res.sendStatus(400);
  }

  const uid = Number(userId);

  if (Number.isNaN(uid)) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(uid);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.create({
    userId: uid,
    spentAt,
    title,
    amount: Number(amount),
    category: category ?? 'Other',
    note,
  });

  res.status(201).send(expense);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const expenseId = Number(id);

  if (Number.isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const expenseId = Number(id);

  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expenseId);

  res.sendStatus(204);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const expenseId = Number(id);
  const { spentAt, title, amount, category, note } = req.body;

  if (Number.isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  const updatedExpense = await expenseService.getById(expenseId);

  res.send(updatedExpense);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
