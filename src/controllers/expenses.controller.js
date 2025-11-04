const expenseService = require('../services/expenses.service.js');
const userService = require('../services/user.service.js');

const transformExpense = (expense) => {
  if (!expense) {
    return expense;
  }

  const plain = expense.toJSON();

  plain.category = plain.Category ? plain.Category.name : null;
  delete plain.Category;
  delete plain.categoryId;

  return plain;
};

const get = async (req, res) => {
  const { categories, userId, from, to } = req.query;
  const result = await expenseService.getExpenses({
    categories,
    userId,
    from,
    to,
  });

  res.status(200).send(result.map(transformExpense));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpense(+id);

  if (!expense) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  res.status(200).send(transformExpense(expense));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    !userId ||
    (note !== undefined && note !== null && typeof note !== 'string') ||
    (category !== undefined &&
      category !== null &&
      typeof category !== 'string') ||
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
    return res.status(400).send({ message: 'Invalid user id' });
  }

  const newExpense = await expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(transformExpense(newExpense));
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expenseToRemove = await expenseService.getExpense(id);

  if (!expenseToRemove) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  await expenseService.deleteExpense(id);
  res.status(204).send();
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expenseToUpdate = await expenseService.getExpense(+id);

  if (!expenseToUpdate) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  if (
    (title !== undefined && typeof title !== 'string') ||
    (note !== undefined && note !== null && typeof note !== 'string') ||
    (amount !== undefined && typeof amount !== 'number') ||
    (category !== undefined &&
      category !== null &&
      typeof category !== 'string') ||
    (spentAt !== undefined &&
      (typeof spentAt !== 'string' || isNaN(Date.parse(spentAt))))
  ) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const updatedExpense = await expenseService.updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(transformExpense(updatedExpense));
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
