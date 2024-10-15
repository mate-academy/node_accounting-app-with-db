'use strict';

const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  destroyUser,
} = require('./services/users.service');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  destroyExpense,
  updateExpense,
} = require('./services/expenses.services');

const createServer = () => {
  // your code goes here
  const app = express(); // ініціалізація серверу

  // отримати всі users з масиву
  app.get('/users', async (req, res) => {
    try {
      const usersFromDB = await getAllUsers();

      res.status(200).send(usersFromDB);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  // отримати конкретного user з масиву
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const chosenUser = await getUserById(id);

    if (!chosenUser) {
      return res.sendStatus(404);
    }

    res.send(chosenUser);
  });

  // додати новий user до масиву
  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await createUser({ name });

    res.status(201).send(user);
  });

  // видалити user з масиву за id
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await destroyUser({ id });

      if (deletedRows === 0) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.sendStatus(204); // No content, deletion successful
    } catch (error) {
      res.status(500).send({ message: error.message }); // Server error
    }
  });

  // відредагувати user з масиву
  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Validate the input before trying to update
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send({ message: 'Invalid name provided' });
    }

    try {
      const updatedUser = await updateUser({ id, name });

      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // отримати всі expenses з масиву
  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const allExpenses = await getAllExpenses();

    if (!userId && !categories && (!from || !to)) {
      return res.send(allExpenses);
    }

    const normalizedCategories =
      Array.isArray(categories) || !categories ? categories : [categories];

    let filteredExpenses = allExpenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return expense.userId === parseInt(userId);
      });
    }

    if (normalizedCategories) {
      filteredExpenses = allExpenses.filter((expense) => {
        return normalizedCategories.includes(expense.category);
      });
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = allExpenses.filter((expense) => {
        const spentAt = new Date(expense.spentAt);

        return spentAt >= fromDate && spentAt <= toDate;
      });
    }

    res.send(filteredExpenses);
  });

  // отримати конкретний expense з масиву
  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const chosenExpense = await getExpenseById(id);

    if (!chosenExpense) {
      return res.sendStatus(404);
    }

    res.send(chosenExpense);
  });

  // додати новий expense до масиву
  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.sendStatus(400);
    }

    const newExpense = await createExpense({
      userId,
      spentAt,
      title,
      amount,
      category: category || '',
      note: note || '',
    });

    res.status(201).send(newExpense);
  });

  // видалити expense з масиву
  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await destroyExpense({ id });

      if (deletedRows === 0) {
        return res.status(404).send({ message: 'Expsense not found' });
      }

      res.sendStatus(204); // No content, deletion successful
    } catch (error) {
      res.status(500).send({ message: error.message }); // Server error
    }
  });

  // відредагувати expense з масиву
  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    try {
      const updatedExpense = await updateExpense({
        id,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      if (!updatedExpense) {
        return res.status(404).send({ message: 'Expense not found' });
      }

      res.status(200).send(updatedExpense);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
