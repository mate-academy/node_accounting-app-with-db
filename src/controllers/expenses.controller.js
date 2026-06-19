'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const user = await usersService.getById(userId);

    if (!user) {
      res.status(400).json({ error: 'User not found' });

      return;
    }

    if (!spentAt || !title || !amount) {
      res.status(400).json({ error: 'Missing required fields' });

      return;
    }

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
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    await expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    if (!spentAt && !title && !amount && !category && !note) {
      res.status(400).json({ error: 'At least one field is required' });

      return;
    }

    await expensesService.update({
      id,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    const updatedExpense = await expensesService.getById(id);

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
