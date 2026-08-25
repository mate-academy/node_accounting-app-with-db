const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expenses = await expensesService.getAll({
    userId: userId !== undefined ? Number(userId) : undefined,
    from,
    to,
    categories: categories ? categories.split(',') : undefined,
  });

  res.json(expenses);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
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

const remove = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.deleteById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.status(204).send();
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;
  const expense = await expensesService.update({ id, ...changes });

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
};

const expensesController = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = { expensesController };
