const expensesService = require('../services/expenses.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expensesService.getAll(userId, categories, from, to);

    res.json(expenses);
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end('Id is required');

    return;
  }

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).end('Expense not found');

      return;
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && title && amount)) {
    res.status(400).end('Id, title and amount are required');

    return;
  }

  try {
    const expense = await expensesService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end('Id is required');

    return;
  }

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).end('Expense not found');

      return;
    }

    await expensesService.remove(id);

    res.status(204).end('The deletion was successful');
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { userId, title, amount, category, note } = req.body;

  if (!id) {
    res.status(400).end('Id is required');

    return;
  }

  try {
    await expensesService.update(id, userId, title, amount, category, note);

    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).end('Expense not found');

      return;
    }

    res.status(200).json(expense);
  } catch (error) {
    if (error.message === 'No fields to update') {
      return res.status(400).end('At least one field is required for update');
    }

    res.status(500).end('Server error');
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
