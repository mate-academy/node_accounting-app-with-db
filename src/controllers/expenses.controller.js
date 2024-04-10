const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filteredExpenses = await expensesService.getFilteredExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.send(filteredExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const userExp = await expensesService.getExpById(id);

  if (!userExp) {
    res.sendStatus(404);

    return;
  }

  res.send(userExp);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201);
  res.send(newExpense);
};

const update = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const expense = await expensesService.getExpById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedExp = await expensesService.update({ id, title });

  res.send(updatedExp);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await !expensesService.getExpById(id)) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
