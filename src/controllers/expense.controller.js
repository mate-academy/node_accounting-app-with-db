const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.status(200).send(expenses);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'This id was not found' });
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await usersService.getById(String(userId));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (isNaN(Date.parse(spentAt))) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Title must be a non-empty string' });
  }

  if (typeof category === 'string' && category.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Category must be a non-empty string' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res
      .status(400)
      .json({ message: 'Amount must be a positive number' });
  }

  try {
    const newExpense = await expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(newExpense);
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e);

    res.status(500).json({
      message:
        'The server failed to complete the request due to an unexpected error.',
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const success = await expensesService.remove(id);

  if (!success) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existingExpense = await expensesService.getById(id);

    if (!existingExpense) {
      return res.status(404).json({
        message: 'This id was not found',
      });
    }

    const updatedExpense = await expensesService.update(id, data);

    if (!updatedExpense) {
      return res.status(404).json({
        message: 'Expense not found or no changes were made',
      });
    }

    res.status(200).send(updatedExpense);
  } catch (e) {
    /* eslint-disable no-console */
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
