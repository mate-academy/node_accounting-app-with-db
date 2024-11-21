const { expenseService } = require('../services/expense.service');
const { userService } = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId || categories || from || to) {
    const filtered = await expenseService.filterExpenses(req.query);

    res.statusCode = 200;
    res.send(filtered);

    return;
  }

  const expenses = await expenseService.getAll();

  res.statusCode = 200;
  res.send(expenses);
};

const get = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.get(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = async (req, res) => {
  const { userId, category, spentAt, title, amount, note } = req.body;
  const user = await userService.get(userId);

  if (!user || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const rawExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = await expenseService.create(rawExpense);

  res.statusCode = 201;
  res.send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.get(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const expense = await expenseService.get(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = Object.assign(expense, req.body);

  await expense.update(newExpense);
  res.send(newExpense);
};

module.exports = {
  getAll,
  add,
  get,
  remove,
  update,
};
