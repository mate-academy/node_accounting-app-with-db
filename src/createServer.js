/* eslint-disable no-console */
'use strict';

const express = require('express');
const {
  models: { User, Expense },
} = require('../src/models/models');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());

  // #region GET all users
  app.get('/users', async (req, res) => {
    try {
      const result = await User.findAll();

      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

  // #endregion
  // #region GET user by ID
  async function getUserById(id) {
    try {
      const result = await User.findByPk(id);

      return result ? { id: result.id, name: result.name } : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user by ID');
    }
  }

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const result = await getUserById(id);

      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching user' });
    }
  });

  // #endregion
  // #region POST user
  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send({ message: 'Invalid user name' });
    }

    try {
      const result = await User.create({ name });

      res.status(201).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error creating user' });
    }
  });

  // #endregion
  // #region PATCH user
  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(422).send({ message: 'Invalid name format' });
    }

    try {
      const [updatedRows, updatedRecords] = await User.update(
        { name },
        { where: { id }, returning: true },
      );

      if (updatedRows === 0) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.send(updatedRecords[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating user' });
    }
  });

  // #endregion
  // #region DELETE user
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const deletedUser = await User.destroy({ where: { id } });

      if (deletedUser === 0) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error deleting user' });
    }
  });
  // #endregion

  // -----------------------------------

  // #region Helper functions Expenses
  async function getAllExpenses(userId, categories, from, to) {
    try {
      const filterConditions = {};

      if (userId) {
        filterConditions.userId = userId;
      }

      if (categories) {
        filterConditions.category = { [Op.in]: categories.split(',') };
      }

      if (from) {
        filterConditions.spentAt = {
          ...filterConditions.spentAt,
          [Op.gte]: new Date(from),
        };
      }

      if (to) {
        filterConditions.spentAt = {
          ...filterConditions.spentAt,
          [Op.lte]: new Date(to),
        };
      }

      return await Expense.findAll({ where: filterConditions });
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching expenses');
    }
  }

  async function getExpenseById(expenseId) {
    try {
      const result = await Expense.findByPk(expenseId);

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching expense by ID');
    }
  }

  // #endregion

  // #region GET all expenses
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    try {
      const expenses = await getAllExpenses(userId, categories, from, to);

      res.send(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching expenses' });
    }
  });

  // #endregion
  // #region GET expenses by ID
  app.get('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    try {
      const expense = await getExpenseById(expenseId);

      if (!expense) {
        return res.status(404).send({ message: 'Expense not found' });
      }
      res.send(expense);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching expense' });
    }
  });

  // #endregion
  // #region POST expenses
  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    try {
      const currentUser = await getUserById(userId);

      if (!currentUser) {
        return res.status(400).send({ message: 'User not found' });
      }

      if (!spentAt || !title || amount === null) {
        return res.status(400).send({ message: 'Invalid expense data' });
      }

      const newExpense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(201).send(newExpense);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error creating expense' });
    }
  });

  // #endregion
  // #region PATCH expenses
  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    try {
      const expense = await getExpenseById(id);

      if (!expense) {
        return res.status(404).send({ message: 'Expense not found' });
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

      const [updatedRows, updatedRecords] = await Expense.update(updateFields, {
        where: { id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(404).send({ message: 'Expense not found' });
      }

      res.send(updatedRecords[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating expense' });
    }
  });

  // #endregion
  // #region DELETE expenses
  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await Expense.destroy({ where: { id } });

      if (deletedRows === 0) {
        return res.status(404).send({ message: 'Expense not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error deleting expense' });
    }
  });

  // #endregion

  return app;
}

module.exports = {
  createServer,
};
