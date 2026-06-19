'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const { User, Expense, Category } = models;

const expenseInclude = [
  {
    model: Category,
    as: 'category',
    attributes: ['id', 'name'],
    required: false,
  },
];

const serializeExpense = (expense) => {
  const plainExpense = expense.get({ plain: true });
  const categoryName = plainExpense.category?.name;

  delete plainExpense.categoryId;
  delete plainExpense.category;

  if (categoryName !== undefined) {
    plainExpense.category = categoryName;
  }

  return plainExpense;
};

const getCategoryId = async ({ categoryId, category }) => {
  if (categoryId === undefined && category === undefined) {
    return undefined;
  }

  if (categoryId !== undefined) {
    const categoryById = await Category.findByPk(Number(categoryId));

    return categoryById ? categoryById.id : null;
  }

  if (!category) {
    return null;
  }

  const [categoryByName] = await Category.findOrCreate({
    where: { name: category },
    defaults: { name: category },
  });

  return categoryByName.id;
};

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  });

  app.get('/users', async (_req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.get('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.json(user);
  });

  app.patch('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    if (!req.body.name) {
      res.status(400).send('Name is required');

      return;
    }

    await user.update({
      name: req.body.name,
    });

    res.json(user);
  });

  app.delete('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    await user.destroy();

    res.status(204).send();
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, categoryId, category, note } =
      req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      res.status(400).send('Required fields are missing');

      return;
    }

    const user = await User.findByPk(Number(userId));

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const resolvedCategoryId = await getCategoryId({ categoryId, category });

    if (
      (categoryId !== undefined || category !== undefined) &&
      !resolvedCategoryId
    ) {
      res.status(400).send('Category not found');

      return;
    }

    const newExpense = await Expense.create({
      userId: Number(userId),
      spentAt,
      title,
      amount,
      categoryId: resolvedCategoryId,
      note,
    });

    const createdExpense = await Expense.findByPk(newExpense.id, {
      include: expenseInclude,
    });

    res.status(201).json(serializeExpense(createdExpense));
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};
    const include = [...expenseInclude];

    if (userId) {
      where.userId = Number(userId);
    }

    if (from || to) {
      where.spentAt = {};
    }

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }

    if (categories) {
      include[0] = {
        ...include[0],
        required: true,
        where: {
          name: {
            [Op.in]: categories.split(','),
          },
        },
      };
    }

    const expenses = await Expense.findAll({
      where,
      include,
    });

    res.json(expenses.map(serializeExpense));
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = await Expense.findByPk(expenseId, {
      include: expenseInclude,
    });

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    res.json(serializeExpense(expense));
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = await Expense.findByPk(expenseId, {
      include: expenseInclude,
    });

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const { userId, spentAt, title, amount, categoryId, category, note } =
      req.body;
    const updatedFields = {};

    if (userId !== undefined) {
      const user = await User.findByPk(Number(userId));

      if (!user) {
        res.status(400).send('User not found');

        return;
      }

      updatedFields.userId = Number(userId);
    }

    if (spentAt !== undefined) {
      updatedFields.spentAt = spentAt;
    }

    if (title !== undefined) {
      updatedFields.title = title;
    }

    if (amount !== undefined) {
      updatedFields.amount = amount;
    }

    const resolvedCategoryId = await getCategoryId({ categoryId, category });

    if (categoryId !== undefined || category !== undefined) {
      if (!resolvedCategoryId && category !== null) {
        res.status(400).send('Category not found');

        return;
      }

      updatedFields.categoryId = resolvedCategoryId;
    }

    if (note !== undefined) {
      updatedFields.note = note;
    }

    await expense.update(updatedFields);

    const updatedExpense = await Expense.findByPk(expenseId, {
      include: expenseInclude,
    });

    res.json(serializeExpense(updatedExpense));
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    await expense.destroy();

    res.status(204).send();
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  });

  app.get('/categories', async (_req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.get('/categories/:categoryId', async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send('Category not found');

      return;
    }

    res.json(category);
  });

  app.patch('/categories/:categoryId', async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    const { name } = req.body;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send('Category not found');

      return;
    }

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    await category.update({ name });

    res.json(category);
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send('Category not found');

      return;
    }

    await category.destroy();

    res.status(204).send();
  });

  return app;
};

module.exports = {
  createServer,
};
