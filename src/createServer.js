'use strict';

const express = require('express');
const { Op } = require('sequelize');

const {
  models: { User, Expense, Category },
} = require('./models/models');

function normalizeTitle(value) {
  if (value === undefined || value === null) {
    return null;
  }

  const title = String(value).trim();

  return title || null;
}

async function resolveCategoryIdByTitle(title) {
  const normalized = normalizeTitle(title);

  if (!normalized) {
    return null;
  }

  const [category] = await Category.findOrCreate({
    where: { title: normalized },
    defaults: { title: normalized },
  });

  return category.id;
}

function serializeExpense(expenseInstance) {
  const plain = expenseInstance.toJSON();
  const categoryTitle =
    plain.Category && typeof plain.Category.title === 'string'
      ? plain.Category.title
      : null;

  return {
    id: plain.id,
    spentAt: plain.spentAt,
    title: plain.title,
    amount: plain.amount,
    category: categoryTitle,
    note: plain.note ?? null,
    userId: plain.userId,
  };
}

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name });

    return res.status(201).json(user.toJSON());
  });

  app.get('/users', async (_req, res) => {
    const users = await User.findAll({ order: [['id', 'ASC']] });

    return res.json(users.map((u) => u.toJSON()));
  });

  app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.json(user.toJSON());
  });

  async function updateUser(req, res) {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body || {};

    if (name !== undefined) {
      user.name = name;
    }

    await user.save();

    return res.json(user.toJSON());
  }

  app.patch('/users/:id', updateUser);
  app.put('/users/:id', updateUser);

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();

    return res.sendStatus(204);
  });

  app.post('/categories', async (req, res) => {
    const { title } = req.body || {};

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const category = await Category.create({ title });

    return res.status(201).json(category.toJSON());
  });

  app.get('/categories', async (_req, res) => {
    const categories = await Category.findAll({ order: [['id', 'ASC']] });

    return res.json(categories.map((c) => c.toJSON()));
  });

  app.get('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    return res.json(category.toJSON());
  });

  app.patch('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    const { title } = req.body || {};

    if (title !== undefined) {
      category.title = title;
    }

    await category.save();

    return res.json(category.toJSON());
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    await category.destroy();

    return res.sendStatus(204);
  });

  app.post('/expenses', async (req, res) => {
    const body = req.body || {};
    const { spentAt, title, amount, note, userId, category, categoryId } = body;

    if (!spentAt || !title || amount === undefined || userId === undefined) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const user = await User.findByPk(Number(userId));

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    let resolvedCategoryId = null;

    if (categoryId !== undefined && categoryId !== null) {
      const found = await Category.findByPk(Number(categoryId));

      if (!found) {
        return res.status(400).json({ error: 'Category not found' });
      }
      resolvedCategoryId = found.id;
    } else if (category !== undefined) {
      resolvedCategoryId = await resolveCategoryIdByTitle(category);
    }

    const created = await Expense.create({
      spentAt,
      title,
      amount,
      note,
      userId: Number(userId),
      categoryId: resolvedCategoryId,
    });

    const expense = await Expense.findByPk(created.id, {
      include: [{ model: Category, attributes: ['title'], required: false }],
    });

    return res.status(201).json(serializeExpense(expense));
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId !== undefined) {
      where.userId = Number(userId);
    }

    if (from && to) {
      where.spentAt = { [Op.between]: [new Date(from), new Date(to)] };
    } else if (from) {
      where.spentAt = { [Op.gte]: new Date(from) };
    } else if (to) {
      where.spentAt = { [Op.lte]: new Date(to) };
    }

    if (categories) {
      const raw = String(categories)
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);

      const numericIds = raw
        .map((v) => Number(v))
        .filter((n) => Number.isFinite(n));

      if (numericIds.length > 0) {
        where.categoryId = { [Op.in]: numericIds };
      } else {
        const found = await Category.findAll({
          where: { title: { [Op.in]: raw } },
          attributes: ['id'],
        });

        const ids = found.map((c) => c.id);

        if (ids.length === 0) {
          return res.json([]);
        }

        where.categoryId = { [Op.in]: ids };
      }
    }

    const expenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
      include: [{ model: Category, attributes: ['title'], required: false }],
    });

    return res.json(expenses.map(serializeExpense));
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id, {
      include: [{ model: Category, attributes: ['title'], required: false }],
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.json(serializeExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const body = req.body || {};
    const allowed = ['spentAt', 'title', 'amount', 'note', 'userId'];

    for (const key of allowed) {
      if (body[key] !== undefined) {
        expense[key] = key === 'userId' ? Number(body[key]) : body[key];
      }
    }

    if (body.userId !== undefined) {
      const user = await User.findByPk(Number(body.userId));

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    if (body.categoryId !== undefined || body.category !== undefined) {
      let resolvedCategoryId = null;

      if (body.categoryId !== undefined && body.categoryId !== null) {
        const found = await Category.findByPk(Number(body.categoryId));

        if (!found) {
          return res.status(400).json({ error: 'Category not found' });
        }
        resolvedCategoryId = found.id;
      } else if (body.category !== undefined) {
        resolvedCategoryId = await resolveCategoryIdByTitle(body.category);
      }

      expense.categoryId = resolvedCategoryId;
    }

    await expense.save();

    const reloaded = await Expense.findByPk(expense.id, {
      include: [{ model: Category, attributes: ['title'], required: false }],
    });

    return res.json(serializeExpense(reloaded));
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.destroy();

    return res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
