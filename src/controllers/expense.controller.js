/* eslint-disable function-paren-newline */
const Expense = require('../models/Expense.model');
const User = require('../models/User.model');
const { STATUS_CODES } = require('../constants/statusCodes');

const getExpenses = async (req, res) => {
  const { categories, ...otherQueryParams } = req.query;
  const query = { ...otherQueryParams };

  if (categories) {
    query.categories = categories.split(',');
  }

  try {
    const response = await Expense.getExpenses(query);

    res.status(STATUS_CODES.OK).send(response);
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch expenses' });
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
      return res.sendStatus(STATUS_CODES.BAD_REQUEST);
    }
  }

  try {
    const user = await User.getUser(userId);

    if (!user) {
      return res.sendStatus(STATUS_CODES.BAD_REQUEST);
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

    res.status(STATUS_CODES.CREATED).send(createdExpense);
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to add expense' });
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.sendStatus(STATUS_CODES.BAD_REQUEST);
  }

  try {
    const response = await Expense.getExpense(id);

    if (!response) {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    } else {
      res.status(STATUS_CODES.OK).send(response);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch expense' });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Expense.getExpense(id);

    if (response) {
      await Expense.deleteExpense(id);

      res.sendStatus(STATUS_CODES.NO_CONTENT);
    } else {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to delete expense' });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.sendStatus(STATUS_CODES.BAD_REQUEST);
  }

  try {
    const response = await Expense.getExpense(id);

    if (response) {
      const updatedExpense = await Expense.updateExpense(id, req.body);

      res.status(STATUS_CODES.OK).send(updatedExpense);
    } else {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    }
  } catch {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to update expense' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
