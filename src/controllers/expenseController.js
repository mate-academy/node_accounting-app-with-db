const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

const getAll = async (req, res) => {
  let expenses = await expenseService.getAll();
  const { userId, categories, from, to } = req.query;

  if (userId) {
    expenses = expenses.filter((e) => String(e.userId) === userId);
  }

  if (categories) {
    const categoriesList = categories.split(',');

    expenses = expenses.filter((e) => categoriesList.includes(e.category));
  }

  if (from) {
    expenses = expenses.filter(
      (e) => new Date(e.spentAt).getTime() >= new Date(from).getTime(),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (e) => new Date(e.spentAt).getTime() <= new Date(to).getTime(),
    );
  }

  res.status(200).json(expenses);
};

const getById = async (req, res) => {
  const expense = await expenseService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !spentAt ||
    !title ||
    amount === undefined ||
    amount === null ||
    !userId
  ) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const remove = async (req, res) => {
  const expense = await expenseService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expenseService.remove(expense.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const expense = await expenseService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expenseService.update({
    id: expense.id,
    userId: req.body.userId !== undefined ? req.body.userId : expense.userId,
    spentAt:
      req.body.spentAt !== undefined ? req.body.spentAt : expense.spentAt,
    title: req.body.title !== undefined ? req.body.title : expense.title,
    amount: req.body.amount !== undefined ? req.body.amount : expense.amount,
    category:
      req.body.category !== undefined ? req.body.category : expense.category,
    note: req.body.note !== undefined ? req.body.note : expense.note,
  });

  res.status(200).json(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
