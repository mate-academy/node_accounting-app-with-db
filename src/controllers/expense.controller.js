const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const filteredExpenses = await expenseService.getAll(req.query);

  res.status(200).json(filteredExpenses);
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.status(400);
  }

  const newExpense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category: category ?? '',
    note: note ?? '',
  });

  res.status(201).json(newExpense);
};

const update = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { userId, spentAt, title, amount, category, note } = req.body;

  const updatedExpenses = await expenseService.update(id, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).json(updatedExpenses);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
