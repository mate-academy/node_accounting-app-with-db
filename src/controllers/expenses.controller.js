const expensesService = require('../repository/expenses.repository');
const usersService = require('../repository/users.repository');

const get = async (req, res) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.json(expenses);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userAdded = await usersService.getById(userId);

  if (userAdded === null) {
    res.status(400).json({ error: 'User not found' });

    return;
  }

  try {
    const expense = await expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req;

  try {
    const expense = await expensesService.getById(id);

    if (expense === null) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }
    res.json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { id } = req;
  const expenseAdded = await expensesService.getById(id);

  if (expenseAdded === null) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  try {
    await expensesService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  const { id } = req;
  const { spentAt, title, amount, category, note } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: 'No fields to update' });

    return;
  }

  const expenseAdded = await expensesService.getById(id);

  if (expenseAdded === null) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  try {
    const expenseUpdated = await expensesService.update({
      id,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.json(expenseUpdated);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
