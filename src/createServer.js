'use strict';

const express = require('express');
const userController = require('./controller/user.controller.js');
const categoryController = require('./controller/categoty.controller.js');
const { Expense } = require('./models/Expense.model.js');
const { User } = require('./models/User.model.js');
// const { Category } = require('./models/Category.model.js');

const createServer = () => {
  const app = express();

  app.use(express.json());

  // #region user

  app.get('/users', userController.get);

  app.get('/users/:id', userController.getOne);

  app.delete('/users/:id', userController.remove);

  app.patch('/users/:id', userController.edit);

  app.post('/users', userController.create);

  // #endregion

  // #region expense

  app.get('/expenses', async (req, res) => {
    const { userId, categoryId } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const expenses = await Expense.findAll({
      where,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.status(200).json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).end();
    }

    const expense = await Expense.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!expense) {
      return res.status(404).end();
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).end();
    }

    const expense = await Expense.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!expense) {
      return res.status(404).end();
    }

    await Expense.destroy({
      where: {
        id,
      },
    });

    return res.status(204).end();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, categoryId, note } = req.body;

    if (!id) {
      return res.status(400).end();
    }

    const expense = await Expense.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!expense) {
      return res.status(404).end();
    }

    await expense.update(
      {
        spentAt,
        title,
        amount,
        categoryId,
        note,
      },
      { silent: true },
    );

    const result = expense.get({ plain: true });

    delete result.createdAt;
    delete result.updatedAt;

    return res.status(200).json(result);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, categoryId, note } = req.body;

    if (
      userId == null ||
      title == null ||
      amount == null ||
      categoryId == null
    ) {
      return res.status(400).end();
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).end(); // ✅ REQUIRED BY TEST
    }

    const expense = await Expense.create({
      userId,
      spentAt: spentAt ?? new Date(),
      title,
      amount,
      categoryId,
      note,
    });

    const result = expense.get({ plain: true });

    delete result.createdAt;
    delete result.updatedAt;

    return res.status(201).json(result);
  });

  // #endregion

  // #region category

  app.get('/category', categoryController.get);

  app.get('/category/:id', categoryController.getOne);

  app.delete('/category/:id', categoryController.remove);

  app.patch('/category/:id', categoryController.edit);

  app.post('/category', categoryController.create);

  // #endregion

  return app;
};

module.exports = {
  createServer,
};
