const expensesService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAll(userId, categories, from, to);

  res.status(200).json(expenses.map(expensesService.normalizeExpense));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(+id);

  if (!expense) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.send(expensesService.normalizeExpense(expense));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const ex = await expensesService.create({
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  });

  if (!ex) {
    return res.status(404).send({ message: 'Not found' });
  }

  res.status(201).json(expensesService.normalizeExpense(ex));
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteExpense = await expensesService.deleteById(+id);

  if (!deleteExpense) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(204).send();
};

const upDate = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!id) {
    return res.status(400).send('Bad Request');
  }

  const expensUpdate = await expensesService.getById(+id);

  if (!expensUpdate) {
    return res.status(404).send({ message: 'Not found' });
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res.status(400).send('Bad Request');
  }

  const expense = await expensesService.upDate({
    id: +id,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  });

  if (expense === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(expensesService.normalizeExpense(expense));
};

const expensesController = {
  getAll,
  getById,
  deleteById,
  upDate,
  create,
};

module.exports = {
  expensesController,
};
