const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const get = async (req, res) => {
  const filters = req.query;

  res.json(await expensesService.getAll(filters));
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    title.trim() !== '' ||
    amount === undefined ||
    amount < 0
  ) {
    return res.sendStatus(400);
  }

  if (!(await usersService.getById(userId))) {
    return res.sendStatus(404);
  }

  const expense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const update = async (req, res) => {
  const id = req.params.id;
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).json(updatedExpense);
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!(await expensesService.getById(id))) {
    return res.sendStatus(404);
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
