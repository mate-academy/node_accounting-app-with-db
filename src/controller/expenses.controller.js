'use strict';

const serviceExpense = require('./../service/expenses.service');
// const serviceCategory = require('./../service/categories.service');
const serviceUser = require('./../service/users.service');

const getAllExpenses = async (req, res) => {
  try {
    const query = req.query;

    if (query && Object.keys(query).length > 0) {
      const result = await serviceExpense.getExpenseByParams(query);

      return res.send(result);
    }

    const expenses = await serviceExpense.getAllExpenses();

    // res.statusCode = 200;
    res.send(expenses);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).send('Id parameter is required');
    }

    const expense = await serviceExpense.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const createExpense = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId === undefined || !spentAt || !title || amount === undefined) {
      return res.status(400).send('Missing required parameter');
    }

    const user = await serviceUser.getUserById(userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const newExpense = await serviceExpense.createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(201).send(newExpense);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const expense = await serviceExpense.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    await serviceExpense.deleteExpense(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Id parameter is invalid');
    }

    const data = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('Empty body');
    }

    const expense = await serviceExpense.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    const check = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];
    const hasToUpdate = check.some((field) => data[field] !== undefined);

    if (!hasToUpdate) {
      return res.sendStatus(400);
    }

    const updatedExpense = await serviceExpense.updateExpense(id, data);

    if (!updatedExpense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    return res.status(200).send(updatedExpense);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
