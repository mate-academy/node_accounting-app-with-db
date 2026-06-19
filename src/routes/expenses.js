const express = require('express');
const { Expense, User } = require('../models');
const { Op } = require('sequelize');
const {
  formatExpenseResponse,
  formatExpensesResponse,
} = require('../utils/responseFormatters');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    let whereClause = {};

    if (userId && !isNaN(userId)) {
      whereClause.userId = parseInt(userId); // Use JavaScript field name
    }

    if (from && to) {
      whereClause.spentAt = {
        // Use JavaScript field name
        [Op.between]: [new Date(from), new Date(to)],
      };
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];
      whereClause.category = {
        [Op.in]: categoryList,
      };
    }

    const expenses = await Expense.findAll({
      where: whereClause,
      order: [['spentAt', 'ASC']], // Use JavaScript field name
    });

    res.status(200).json(formatExpensesResponse(expenses));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'Bad request - User not found' });
    }

    const newExpense = await Expense.create({
      userId: userId || 0,
      // user_id: userId || 0,
      spentAt: new Date(spentAt),
      title: title || '',
      amount: amount || 0,
      category: category  || 'categoryNotSet',
      note: note || '',
    });

    res.status(201).json(formatExpenseResponse(newExpense));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);

    if (isNaN(expenseId)) {
      return res
        .status(400)
        .json({ error: 'Bad request - Invalid expense ID' });
    }

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json(formatExpenseResponse(expense));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    if (isNaN(expenseId)) {
      return res
        .status(400)
        .json({ error: 'Bad request - Invalid expense ID' });
    }

    if (!spentAt && !title && !amount && !category && note === undefined) {
      return res.status(400).json({
        error: 'Bad request - At least one field is required for update',
      });
    }

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (spentAt) {
      expense.spentAt = new Date(spentAt);
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    await expense.save();

    res.status(200).json(formatExpenseResponse(expense));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);

    if (isNaN(expenseId)) {
      return res
        .status(400)
        .json({ error: 'Bad request - Invalid expense ID' });
    }

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Not found' });
    }

    await expense.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
