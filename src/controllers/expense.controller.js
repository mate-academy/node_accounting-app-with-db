'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/expense.service');
const { getAll: getAllUsers } = require('../services/user.service');

const parseQueryParameters = (req) => {
  const userId = req.query.userId ? Number(req.query.userId) : null;
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;
  const categories = req.query.categories
    ? req.query.categories.split(',')
    : [];

  return {
    userId,
    from,
    to,
    categories,
  };
};

const get = async (req, res) => {
  try {
    const filters = parseQueryParameters(req);
    const expenses = await getAll(filters);

    res.send(expenses);
  } catch (error) {
    res.status(500).send('Error fetching expenses');
  }
};

const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await getById(Number(id));

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }
    res.send(expense);
  } catch (error) {
    res.status(500).send('Error fetching expense by id');
  }
};

const createController = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      return res.status(400).send({
        message: 'UserId, spentAt, title, and amount are required',
      });
    }

    const users = await getAllUsers();
    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      return res.status(400).send({ message: 'User not found' });
    }

    const expense = await create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).send(expense);
  } catch (error) {
    res.status(500).send('Error creating expense');
  }
};

const removeController = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await remove(Number(id));

    if (!success) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Error removing expense');
  }
};

const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const expense = await update(Number(id), updates);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }
    res.send(expense);
  } catch (error) {
    res.status(500).send('Error updating expense');
  }
};

module.exports = {
  get,
  getById: getByIdController,
  create: createController,
  remove: removeController,
  update: updateController,
};
