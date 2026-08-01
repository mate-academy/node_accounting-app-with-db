const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expenses = await expensesService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(expenses.map((expense) => expensesService.normalize(expense)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.normalize(expense));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined || !spentAt || !title || amount === undefined) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expensesService.normalize(newExpense));
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.update(id, req.body);

  res.send(expensesService.normalize(updatedExpense));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
