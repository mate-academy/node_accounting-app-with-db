'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { Expense, User, Category },
} = require('../models/models');

const router = express.Router();

function parseCategories(categories) {
  if (!categories) {
    return [];
  }

  const values = Array.isArray(categories) ? categories : [categories];

  return values
    .flatMap((value) => String(value).split(','))
    .map((value) => value.trim())
    .filter(Boolean);
}

router.get('/', async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const parsedCategories = parseCategories(categories);
  const numericCategoryIds = parsedCategories
    .map(Number)
    .filter((n) => !isNaN(n));
  const nameCategoryFilters = parsedCategories.filter((v) => isNaN(Number(v)));

  const where = {};

  if (userId !== undefined) {
    where.userId = Number(userId);
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  if (numericCategoryIds.length > 0) {
    where.categoryId = { [Op.in]: numericCategoryIds };
  }

  if (nameCategoryFilters.length > 0) {
    where.category = { [Op.in]: nameCategoryFilters };
  }

  const expenses = await Expense.findAll({
    where,
    order: [['id', 'ASC']],
  });

  res.status(200).json(expenses);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  res.status(200).json(expense);
});

router.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, categoryId, category, note } =
    req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  if (categoryId !== undefined && categoryId !== null) {
    const cat = await Category.findByPk(categoryId);

    if (!cat) {
      return res.status(400).json({ error: 'Category not found' });
    }
  }

  try {
    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      categoryId,
      category,
      note,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, categoryId, category, note } =
    req.body;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  if (userId !== undefined) {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    expense.userId = userId;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (categoryId !== undefined) {
    if (categoryId !== null) {
      const categoryExists = await Category.findByPk(categoryId);

      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }
    expense.categoryId = categoryId;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  await expense.save();
  await expense.reload();
  res.status(200).json(expense);
};

router.patch('/:id', updateHandler);
router.put('/:id', updateHandler);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  await expense.destroy();
  res.status(204).send();
});

module.exports = router;
