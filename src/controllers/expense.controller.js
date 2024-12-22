const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const { categories, userId, from, to } = req.query;

  const result = await expenseService.getAll(categories, userId, from, to);

  return res.send(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;
  const existedUser = await userService.getById(userId);

  if (!userId || !title || !amount || !spentAt || !existedUser) {
    return res.sendStatus(400);
  }

  const newExpense = await expenseService.createExpense({
    userId,
    title,
    amount,
    spentAt: new Date(spentAt),
    category,
    note,
  });

  res.statusCode = 201;

  return res.send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expenseService.update({ id: +id, data });

  res.send(newExpense);
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
};
