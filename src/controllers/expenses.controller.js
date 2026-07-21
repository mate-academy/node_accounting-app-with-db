const expensesServises = require('./../services/expenses.service');
const usersServices = require('./../services/users.service');

const getAll = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const expenses = await expensesServises.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.json(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!spentAt || !title || !amount) {
    return res
      .status(400)
      .json({ error: 'spentAt, title, amount is required' });
  }

  const user = await usersServices.getById(userId);

  if (!userId || !user) {
    return res.status(400).json({ error: 'User and existing is required' });
  }

  const expense = await expensesServises.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesServises.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'expense is required' });
  }

  return res.status(200).json(expense);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ error: 'expenseId is required' });
  }

  const expense = await expensesServises.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'expense is required' });
  }

  await expensesServises.deleteOne(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesServises.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense is required' });
  }

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpenses = await expensesServises.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return res.json(updatedExpenses);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteOne,
  update,
};
