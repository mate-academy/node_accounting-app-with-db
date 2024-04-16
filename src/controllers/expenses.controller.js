const {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
} = require('../services/expenses.service');
const { getById: getUserById } = require('../services/users.service');
const { getById: getCategoryById } = require('../services/categories.service');

const getExpenses = async (req, res) => {
  const { userId, categoryId, from, to } = req.query;

  const expenses = await getAll({
    userId,
    categoryId,
    from,
    to,
  });

  res.status(200);
  res.send(expenses.map((expense) => normalize(expense)));
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.status(404);

    res.send('Expense not found');
  }

  res.status(200);
  res.send(normalize(expense));
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, categoryId, note } = req.body;

  if (!userId) {
    res.status(400);

    res.send('UserId is required');
  }

  const user = await getUserById(userId);

  if (!user) {
    res.status(400);

    res.send('UserId is incorrect');
  }

  if (!spentAt) {
    res.status(400);

    res.send('SpentAt is required');
  }

  if (!title) {
    res.status(400);

    res.send('Title is required');
  }

  if (!amount) {
    res.status(400);

    res.send('Amount is required');
  }

  if (!categoryId) {
    res.status(400);

    res.send('CategoryId is required');
  }

  const category = await getCategoryById(categoryId);

  if (!category) {
    res.status(400);

    res.send('CategoryId is incorrect');
  }

  const newExpense = await create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  res.status(201);
  res.send(normalize(newExpense));
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data) {
    res.status(400);

    res.send(
      // eslint-disable-next-line max-len
      'At least 1 parameter is required - spentAt, title, amount, categoryId, note',
    );
  }

  const expense = await getById(id);

  if (!expense) {
    res.status(404);
    res.send('Expense not found');
  }

  await update(id, data);

  const updatedExpense = await getById(id);

  res.status(200);
  res.send(normalize(updatedExpense));
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.status(404);
    res.send('Expense not found');
  }

  await remove(id);

  res.status(204);
  res.send(normalize(expense));
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
