'use strict';

const express = require('express');

const { User, Expense, Category } = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    try {
      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  app.get('/users', async (req, res) => {
    res.json(await User.findAll());
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('Not found');
    }
    await user.update(req.body, { silent: true });
    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('Not found');
    }
    await user.destroy();
    res.sendStatus(204);
  });

  app.post('/expenses', async (req, res) => {
    const { title, amount, userId, category, note, spentAt } = req.body;

    if (!title || !amount || !userId) {
      return res.sendStatus(400);
    }

    try {
      const [foundCategory] = await Category.findOrCreate({
        where: { name: category || 'Other' },
      });

      const expense = await Expense.create({
        title,
        amount,
        userId,
        categoryId: foundCategory.id,
        note,

        spentAt: spentAt || new Date(),
      });

      const result = expense.toJSON();

      delete result.categoryId;

      res.status(201).json({
        ...result,
        category: foundCategory.name,
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const { Op } = require('sequelize');

    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = from;
      }

      if (to) {
        where.spentAt[Op.lte] = to;
      }
    }

    const include = [
      {
        model: Category,
        as: 'Category',

        ...(categories && {
          where: { name: categories },
          required: true,
        }),
      },
    ];

    try {
      const expenses = await Expense.findAll({
        where,
        include,
      });

      const result = expenses.map((exp) => {
        const data = exp.toJSON();

        return {
          id: data.id,
          title: data.title,
          amount: data.amount,
          spentAt: data.spentAt,
          note: data.note,
          userId: data.userId,
          category: data.Category ? data.Category.name : null,
        };
      });

      res.json(result);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const deletedCount = await Expense.destroy({
      where: { id: req.params.id },
    });

    if (deletedCount === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category, as: 'Category' }],
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    const data = expense.toJSON();
    const response = {
      ...data,
      category: data.Category ? data.Category.name : null,
    };

    delete response.Category;
    delete response.categoryId;

    res.json(response);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const { category, ...otherData } = req.body;
    const updateData = { ...otherData };

    if (category) {
      const [foundCategory] = await Category.findOrCreate({
        where: { name: category },
      });

      updateData.categoryId = foundCategory.id;
    }

    await expense.update(updateData);

    const updatedExpense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category, as: 'Category' }],
    });

    const data = updatedExpense.toJSON();
    const response = {
      ...data,
      category: data.Category ? data.Category.name : null,
    };

    delete response.Category;
    delete response.categoryId;

    res.json(response);
  });

  app.get('/categories', async (req, res) => {
    try {
      const categories = await Category.findAll({ order: [['id', 'ASC']] });

      res.json(categories);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    try {
      const [category, created] = await Category.findOrCreate({
        where: { name },
      });

      res.status(created ? 201 : 200).json(category);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.patch('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }
      await category.update(req.body);
      res.json(category);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.sendStatus(404);
      }
      await category.destroy();
      res.sendStatus(204);
    } catch (e) {
      res
        .status(400)
        .send('Cannot delete category: it is assigned to expenses.');
    }
  });

  return app;
};

module.exports = { createServer };
