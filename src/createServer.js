'use strict';

const express = require('express');
const User = require('./models/User.model');

const createServer = () => {
  // your code goes here
  const app = express(); // ініціалізація серверу
  let users = []; // масив users
  let expenses = []; // масив expenses

  // Функція для отримання наступного порядкового номера для users
  const getNextUserId = () => {
    if (users.length === 0) {
      return 1;
    } // якщо немає користувачів, починати з 1

    // eslint-disable-next-line max-len
    return Math.max(...users.map((user) => user.id)) + 1; // знаходимо максимальний id і додаємо 1
  };

  // Функція для отримання наступного порядкового номера для expenses
  const getNextExpenseId = () => {
    if (expenses.length === 0) {
      return 1;
    } // якщо немає витрат, починати з 1

    // eslint-disable-next-line max-len
    return Math.max(...expenses.map((expense) => expense.id)) + 1; // знаходимо максимальний id і додаємо 1
  };

  // отримати всі users з масиву
  app.get('/users', async (req, res) => {
    try {
      const usersFromDB = await User.findAll();

      res.status(200).send(usersFromDB);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  // отримати конкретного user з масиву
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line max-len
    const chosenUser = users.find((user) => user.id === parseInt(id)); // конвертуємо id у число

    if (!chosenUser) {
      return res.sendStatus(404);
    }

    res.send(chosenUser);
  });

  // додати новий user до масиву
  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = {
      id: getNextUserId(), // Використання функції для отримання нового id
      name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  // видалити user з масиву за id
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter((user) => user.id !== parseInt(id));

    if (users.length === newUsers.length) {
      return res.sendStatus(404);
    }

    users = newUsers;

    res.sendStatus(204);
  });

  // відредагувати user з масиву
  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const chosenUser = users.find((user) => user.id === parseInt(id));

    if (typeof name !== 'string') {
      return res.sendStatus(400);
    }

    if (!chosenUser || !name) {
      return res.sendStatus(404);
    }

    Object.assign(chosenUser, { name });

    res.send(chosenUser);
  });

  // отримати всі expenses з масиву
  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    if (!userId && !categories && (!from || !to)) {
      res.send(expenses);
    }

    const normalizedCategories =
      Array.isArray(categories) || !categories ? categories : [categories];

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return expense.userId === parseInt(userId);
      });
    }

    if (normalizedCategories) {
      filteredExpenses = expenses.filter((expense) => {
        return normalizedCategories.includes(expense.category);
      });
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = expenses.filter((expense) => {
        const spentAt = new Date(expense.spentAt);

        return spentAt >= fromDate && spentAt <= toDate;
      });
    }

    res.send(filteredExpenses);
  });

  // отримати конкретний expense з масиву
  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const chosenExpense = expenses.find(
      (expense) => expense.id === parseInt(id),
    );

    if (!chosenExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(chosenExpense);
  });

  // додати новий expense до масиву
  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.sendStatus(400);
    }

    const findUser = users.find((user) => user.id === userId);

    if (!findUser) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: getNextExpenseId(), // Використання функції для отримання нового id
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  // видалити expense з масиву
  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter(
      (expense) => expense.id !== parseInt(id),
    );

    if (expenses.length === newExpenses.length) {
      return res.sendStatus(404);
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  // відредагувати expense з масиву
  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const chosenExpense = expenses.find(
      (expense) => expense.id === parseInt(id),
    );

    if (!chosenExpense) {
      return res.sendStatus(404);
    }

    Object.assign(chosenExpense, req.body);

    res.status(200).send(chosenExpense);
  });

  return app;
};

module.exports = {
  createServer,
};
