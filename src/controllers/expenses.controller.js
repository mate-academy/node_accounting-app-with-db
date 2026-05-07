const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  const { categories, userId, from, to } = req.query;
  const result = await expenseService.getExpenses({
    categories,
    userId,
    from,
    to,
  });

  res.status(200).send(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpense(id);

  if (!expense) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    !userId ||
    (note !== undefined && typeof note !== 'string') ||
    (category !== undefined && typeof category !== 'string') ||
    typeof title !== 'string' ||
    !title ||
    typeof amount !== 'number' ||
    !amount ||
    typeof spentAt !== 'string' ||
    isNaN(Date.parse(spentAt)) ||
    !spentAt
  ) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const isUser = await userService.getUser(userId);

  if (!isUser) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const newExpense = await expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expenseToRemove = await expenseService.getExpense(id);

  if (!expenseToRemove) {
    return res.status(404).send({ message: 'Expense not found' });
  }
  await expenseService.deleteExpense(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expenseToUpdate = await expenseService.getExpense(id);

  if (!expenseToUpdate) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  if (
    (title !== undefined && typeof title !== 'string') ||
    (note !== undefined && typeof note !== 'string') ||
    (amount !== undefined && typeof amount !== 'number') ||
    (category !== undefined && typeof category !== 'string') ||
    (spentAt !== undefined &&
      (typeof spentAt !== 'string' || isNaN(Date.parse(spentAt))))
  ) {
    return res.status(400).send();
  }

  const updatedExpense = await expenseService.updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
