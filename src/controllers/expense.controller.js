const { expenseService } = require('../services/expense.service');
const { userService } = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expenses = await expenseService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.status(200).json(expenses);
};

const getById = async (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.json(expense);
};

const add = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const parsedUserId = parseInt(userId);

  if (!parsedUserId || !spentAt || !title || amount == null) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(parsedUserId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.add({
    userId: parsedUserId,
    spentAt,
    title,
    amount,
    category,
    ...(note ? { note } : {}),
  });

  res.status(201).json(expense);
};

const remove = async (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }
  await expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expenseService.update({
    id: expenseId,
    ...req.body,
  });

  res.json(updatedExpense);
};

const expenseController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = { expenseController };
