const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/expenses.service.js');

const { getById: getByUserId } = require('../services/users.service.js');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expenses = await getAll({
    userId: userId ? Number(userId) : undefined,
    from,
    to,
    categories,
  });

  res.send(expenses);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.send(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId == null || spentAt == null || title == null || amount == null) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  const user = await getByUserId(userId);

  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  if (typeof amount !== 'number' || Number.isNaN(new Date(spentAt).getTime())) {
    return res.status(400).send({ message: 'Invalid field' });
  }

  const expense = await create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await remove(id);

  if (!expense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(204).send();
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, spentAt } = req.body;

  const existingExpense = await getById(id);

  if (!existingExpense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  if (amount !== undefined && typeof amount !== 'number') {
    res.status(400).send({ message: 'Invalid field' });

    return;
  }

  if (spentAt !== undefined) {
    const date = new Date(spentAt);

    if (Number.isNaN(date.getTime())) {
      res.status(400).send({ message: 'Invalid field' });

      return;
    }
  }

  const updatedData = {
    ...existingExpense,
    ...req.body,
    id,
  };

  const expense = await update(updatedData);

  if (!expense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(200).send(expense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
};
