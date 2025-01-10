const {
  create,
  update,
  remove,
  getById,
  filterByQuery,
} = require('../services/expense.services');

const getAllExpenses = async (req, res) => {
  const expensesByUser = await filterByQuery(req.query);

  return res.status(200).json(expensesByUser);
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(200).json(expense);
};

const createExpense = async (req, res) => {
  const { spentAt, title, amount, userId, note, category } = req.body;

  if (!spentAt || !title || !amount || !userId) {
    return res.status(400).json({
      message: 'Missing required fields: spentAt, title, amount, userId',
    });
  }

  const newValues = {
    spentAt,
    title,
    amount,
    userId,
    note: note || null,
    category: category || null,
  };

  const newExpense = await create(newValues);

  return res.status(201).json(newExpense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expenseData = req.body;

  await update(id, expenseData);

  const updatedExpense = await getById(id);

  if (!updatedExpense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(200).json(updatedExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  await remove(id);

  return res.status(204).end();
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
