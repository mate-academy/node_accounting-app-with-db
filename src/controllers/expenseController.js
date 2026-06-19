const userService = require('../services/userService');
const expensesService = require('../services/expenseService');

const getAllController = async (req, res) => {
  const expenses = await expensesService.getAll({
    userId: req.query.userId,
    categories: req.query.categories,
    from: req.query.from,
    to: req.query.to,
  });

  res.json(expenses);
};

const getByIdController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.json(expense);
};

const createController = async (req, res) => {
  const { title, userId, spentAt, amount, category, note } = req.body;

  const user = await userService.getById(Number(userId));

  if (!title || !userId || !spentAt || !amount || !category) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const expense = await expensesService.create(
    title,
    Number(userId),
    new Date(spentAt).toISOString(),
    amount,
    category,
    note ?? null,
  );

  res.status(201).json(expense);
};

const deleteOneController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const deleted = await expensesService.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.sendStatus(204);
};

const updateController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const { title, userId, spentAt, amount, category, note } = req.body;

  if (!title && !userId && !spentAt && !amount && !category && !note) {
    return res
      .status(400)
      .json({ message: 'At least one updatable field must be provided' });
  }

  let numericUserId;

  if (userId !== undefined) {
    const user = await userService.getById(Number(userId));

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    numericUserId = Number(userId);
  }

  const updated = await expensesService.update({
    id: Number(req.params.id),
    title,
    userId: numericUserId ?? expense.userId,
    spentAt: spentAt ? new Date(spentAt).toISOString() : expense.spentAt,
    amount,
    category,
    note,
  });

  res.json(updated);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  deleteOneController,
  updateController,
};
