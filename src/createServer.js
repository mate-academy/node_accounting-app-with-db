'use strict';

const express = require('express');
const { Op } = require('sequelize'); // Імпортуємо оператори для фільтрації
const { models } = require('./models/models'); // Підтягуємо наші моделі
const { User, Expense } = models;

function createServer() {
  const app = express();

  app.use(express.json());

  // Встановлюємо правильний Content-Type з charset для ВСІХ відповідей
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // Функція парсингу ID залишається без змін (вона чудова)
  function parseId(idParam, res) {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: 'Invalid id' });

      return null;
    }

    return id;
  }

  // --- USERS API ---

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.status(200).json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const user = await User.findByPk(id); // Шукаємо по Primary Key

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (name == null || typeof name !== 'string' || name.trim() === '') {
      return res
        .status(400)
        .json({ message: 'Name is required and must be a string' });
    }

    const newUser = await User.create({ name }); // База сама дасть ID

    res.status(201).json(newUser);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Invalid name format' });
      }
      user.name = name;
      await user.save(); // Зберігаємо зміни в базу
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy(); // Видаляємо з бази
    res.sendStatus(204);
  });

  // --- EXPENSES API ---

  app.get('/expenses', async (req, res) => {
    const { userId, category, categories, from, to } = req.query;

    if (userId !== undefined && isNaN(Number(userId))) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const whereClause = {};

    if (userId) {
      whereClause.userId = Number(userId);
    }

    const categoryParam = category || categories;

    if (categoryParam) {
      const categoriesArray = Array.isArray(categoryParam)
        ? categoryParam
        : categoryParam.split(',');

      whereClause.category = { [Op.in]: categoriesArray };
    }

    // Логіка для діапазону дат — порівнюємо як рядки,
    // бо spentAt тепер зберігається як STRING у форматі ISO
    if (from || to) {
      whereClause.spentAt = {};

      if (from) {
        whereClause.spentAt[Op.gte] = from; // Більше або дорівнює
      }

      if (to) {
        whereClause.spentAt[Op.lte] = to; // Менше або дорівнює
      }
    }

    const filteredExpenses = await Expense.findAll({ where: whereClause });

    res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId == null ||
      typeof userId !== 'number' ||
      spentAt == null ||
      typeof spentAt !== 'string' ||
      title == null ||
      typeof title !== 'string' ||
      amount == null ||
      typeof amount !== 'number'
    ) {
      return res
        .status(400)
        .json({ message: 'Bad request: Missing or malformed required fields' });
    }

    // category і note — опціональні, але якщо передані, мають бути рядками
    if (category != null && typeof category !== 'string') {
      return res
        .status(400)
        .json({ message: 'Bad request: category must be a string' });
    }

    if (note != null && typeof note !== 'string') {
      return res
        .status(400)
        .json({ message: 'Bad request: note must be a string' });
    }

    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category: category || undefined,
      note: note || undefined,
    });

    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      if (typeof userId !== 'number') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      if (typeof spentAt !== 'string') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      if (typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.title = title;
    }

    if (amount !== undefined) {
      if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.amount = amount;
    }

    if (category !== undefined) {
      if (typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    await expense.save(); // Зберігаємо всі зміни одним запитом
    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
