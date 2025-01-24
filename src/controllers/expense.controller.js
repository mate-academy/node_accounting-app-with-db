const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const { categories, userId, from, to } = req.query;

  const result = await expenseService.getAll(categories, userId, from, to);

  res.send(result);
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
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.createExpense({
    userId,
    title,
    amount,
    spentAt: new Date(spentAt),
    category,
    note,
  });

  res.status(201).send(newExpense);
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
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    res.sendStatus(404);
  }

  const result = await expenseService.update(+id, data);

  if (result.error) {
    return res.sendStatus(404);
  }

  return res.status(200).send(result.data);
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
};
