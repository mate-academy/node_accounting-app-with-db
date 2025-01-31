const expensesService = require('../services/expenses.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAll(userId, categories, from, to);

  res.json(expenses);
};

const getOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end();

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.status(404).end();

    return;
  }

  res.status(200).json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && title && amount)) {
    res.status(400).end();

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

  res.status(201).json(expense);
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end();

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.status(404).end();

    return;
  }

  await expensesService.remove(id);

  res.status(204).end();
};

const update = async (req, res) => {
  const id = req.params.id;
  const { userId, title, amount, category, note } = req.body;

  if (!id) {
    res.status(400).end();

    return;
  }

  try {
    await expensesService.update(id, userId, title, amount, category, note);

    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).end();

      return;
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
