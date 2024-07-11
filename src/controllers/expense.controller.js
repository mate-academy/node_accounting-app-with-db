/* eslint-disable function-paren-newline */
const Expense = require('../models/Expense.model');
const User = require('../models/User.model');

const getExpenses = async (req, res) => {
  const { categories, ...otherQueryParams } = req.query;
  const query = { ...otherQueryParams };

  if (categories) {
    query.categories = categories.split(',');
  }

  try {
    const response = await Expense.getExpenses(query);

    res.send(response);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch expenses' });
  }
};

const addExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  // REQUIRED PROPERTIES
  const requiredProperties = {
    userId,
    spentAt,
    title,
    amount,
  };

  for (const key in requiredProperties) {
    if (!requiredProperties[key]) {
      return res.sendStatus(400);
    }
  }

  try {
    const user = await User.getUser(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const createdExpense = await Expense.addExpense(newExpense);

    res.status(201).send(createdExpense);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add expense' });
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.sendStatus(400);
  }

  try {
    const response = await Expense.getExpense(id);

    if (!response) {
      res.sendStatus(404);
    } else {
      res.send(response);
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch expense' });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Expense.getExpense(id);

    if (response) {
      await Expense.deleteExpense(id);

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete expense' });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.sendStatus(400);
  }

  try {
    const response = await Expense.getExpense(id);

    if (response) {
      const updatedExpense = await Expense.updateExpense(id, req.body);

      res.send(updatedExpense);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.status(500).send({ error: 'Failed to update expense' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
