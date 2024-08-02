const expensesServise = require('../services/expenses.service');
const { getById: getUserById } = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesServise.getAll(req.query);

  res.json(expenses.map(expensesServise.normalize));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await getUserById(userId);

  if (!user || !userId || !spentAt || !title || !amount || isNaN(+amount)) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesServise.create({
    userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  });

  res.status(201).json(expensesServise.normalize(newExpense));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (!id || isNaN(numId)) {
    return res.sendStatus(400);
  }

  const expense = await expensesServise.getById(numId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expensesServise.normalize(expense));
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (!id || isNaN(numId)) {
    return res.sendStatus(400);
  }

  const expense = await expensesServise.getById(numId);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesServise.deleteById(numId);

  res.status(204).json(expensesServise.normalize(expense));
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const numId = +id;

  const expense = await expensesServise.getById(numId);

  if (!expense) {
    return res.sendStatus(404);
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expensesServise.updateById(id, {
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  res.json(expensesServise.normalize(updatedExpense));
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
