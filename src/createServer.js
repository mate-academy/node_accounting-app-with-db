/* eslint-disable no-console */
'use strict';

const express = require('express');
const { models } = require('./models/models');
const { Sequelize } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());

  // #region Helper functions User

  async function getUserById(id) {
    const result = await models.User.findByPk(id);

    if (result) {
      return { id: result.id, name: result.name };
    }

    return null;
  }

  async function postUser(name) {
    const result = await models.User.create({ name });

    return result;
  }

  // #endregion

  // #region GET all users
  app.get('/users', async (req, res) => {
    const result = await models.User.findAll();

    res.send(result);
  });

  // #endregion
  // #region GET user by ID
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const result = await getUserById(id);

      res.send(result);
    } catch {
      res.sendStatus(404);
    }
  });

  // #endregion
  // #region POST user
  app.post('/users', async (req, res) => {
    const { name } = req.body;

    try {
      const result = await postUser(name);

      res.status(201).send(result);
    } catch {
      res.sendStatus(400);
    }
  });

  // #endregion
  // #region PATCH user
  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.sendStatus(422);

      return;
    }

    const [updatedRows, updatedRecords] = await models.User.update(
      { name },
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedRows === 0) {
      return res.sendStatus(404);
    }

    res.send(updatedRecords[0]);
  });

  // #endregion
  // #region DELETE user
  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
      await getUserById(id);

      await models.User.destroy({ where: { id } });
      res.sendStatus(204);
    } catch {
      res.sendStatus(404);
    }
  });
  // #endregion

  // -----------------------------------

  // #region Helper functions Expenses
  async function getAllExpenses(userId, categories, from, to) {
    const filterConditions = {};

    if (userId) {
      filterConditions.userId = userId;
    }

    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : [categories];

      filterConditions.category = { [Sequelize.Op.in]: categoryArray };
    }

    if (from || to) {
      filterConditions.spentAt = {};

      if (from) {
        filterConditions.spentAt[Sequelize.Op.gte] = new Date(from);
      }

      if (to) {
        filterConditions.spentAt[Sequelize.Op.lte] = new Date(to);
      }
    }

    const expenses = await models.Expense.findAll({
      where: filterConditions,
    });

    return expenses;
  }

  async function getExpenseById(expenseId) {
    const result = await models.Expense.findByPk(expenseId);

    return result;
  }

  // #endregion

  // #region GET all expenses
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const expenses = await getAllExpenses(userId, categories, from, to);

    res.send(expenses);
  });

  // #endregion
  // #region GET expenses by ID
  app.get('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;
    const currentExpence = await getExpenseById(expenseId);

    if (!currentExpence) {
      res.sendStatus(404);

      return;
    }

    res.send(currentExpence);
  });

  // #endregion
  // #region POST expenses
  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const currentUser = await getUserById(userId);

    if (!currentUser) {
      return res.sendStatus(400);
    }

    if (!spentAt || !title || amount === null || !category) {
      return res.sendStatus(400);
    }

    const newExpence = await models.Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(newExpence);
  });

  // #endregion
  // #region PATCH expenses
  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const currentExpence = await getExpenseById(+id);

    if (!currentExpence) {
      console.log(id);

      return res.sendStatus(404);
    }

    if (
      (title && typeof title !== 'string') ||
      (amount && (typeof amount !== 'number' || isNaN(amount))) ||
      (category && typeof category !== 'string') ||
      (note && typeof note !== 'string') ||
      (spentAt && isNaN(Date.parse(spentAt)))
    ) {
      return res.sendStatus(422);
    }

    const updateFields = {};

    if (title !== undefined) {
      updateFields.title = title;
    }

    if (amount !== undefined) {
      updateFields.amount = amount;
    }

    if (category !== undefined) {
      updateFields.category = category;
    }

    if (note !== undefined) {
      updateFields.note = note;
    }

    if (spentAt !== undefined) {
      updateFields.spentAt = new Date(spentAt);
    }

    const [updatedRows, updatedRecords] = await models.Expense.update(
      updateFields,
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedRows === 0) {
      return res.sendStatus(404);
    }

    res.send(updatedRecords);
  });

  // #endregion
  // #region DELETE expenses
  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const deletedRows = await models.Expense.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });
  // #endregion

  return app;
}

module.exports = {
  createServer,
};
