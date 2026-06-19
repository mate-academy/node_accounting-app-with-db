const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res
    .status(200)
    .send(await expensesService.getAll(userId, categories, from, to));
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await usersService.getOne(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = expensesService.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.update(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
