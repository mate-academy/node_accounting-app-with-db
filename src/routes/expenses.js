const express = require('express');
const router = express.Router();
const { models } = require('../models/models');
const { Op } = require('sequelize');

// GET /expenses - List expenses with optional filters
router.get('/', async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;
    const whereClause = {};

    // Filter by userId if provided
    if (userId) {
      whereClause.userId = Number(userId);
    }

    // Filter by categories if provided
    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      whereClause.category = { [Op.in]: categoryList };
    }

    // Filter by date range if provided
    if (from || to) {
      whereClause.spentAt = {};

      if (from) {
        whereClause.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        whereClause.spentAt[Op.lte] = new Date(to);
      }
    }

    // Explicitly specify which attributes to include (excluding timestamps)
    const expenses = await models.Expense.findAll({
      where: whereClause,
      // We only select the fields that the tests expect to see
      attributes: [
        'id',
        'spentAt',
        'title',
        'amount',
        'userId',
        'category',
        'note',
        'categoryId',
      ],
      // Include the related category information
      include: [
        {
          model: models.Category,
          attributes: ['id', 'name'],
          required: false, // Left join to get expenses even without a category
        },
      ],
    });

    // Transform the raw result to exactly match test expectations
    const formattedExpenses = expenses.map((expense) => {
      const rawExpense = expense.get({ plain: true });

      // Return only the fields that tests expect
      const formattedExpense = {
        id: rawExpense.id,
        spentAt: rawExpense.spentAt,
        title: rawExpense.title,
        amount: rawExpense.amount,
        userId: rawExpense.userId,
        category: rawExpense.category,
        note: rawExpense.note,
      };

      // Add categoryId if it exists, but don't add it when null to maintain
      // backward compatibility
      if (rawExpense.categoryId) {
        formattedExpense.categoryId = rawExpense.categoryId;
      }

      // Add category data if it exists
      if (rawExpense.Category) {
        formattedExpense.categoryData = {
          id: rawExpense.Category.id,
          name: rawExpense.Category.name,
        };
      }

      return formattedExpense;
    });

    res.status(200).json(formattedExpenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /expenses - Create a new expense
router.post('/', async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, categoryId, note } =
      req.body;

    // Check for required fields
    if (!userId || !spentAt || !title || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify user exists
    const user = await models.User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // If categoryId is provided, verify the category exists
    if (categoryId) {
      const categoryExists = await models.Category.findByPk(categoryId);

      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }

    // Create expense
    const newExpense = await models.Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      categoryId,
      note,
    });

    // Return only the fields that tests expect
    // This ensures timestamps don't appear in the response
    const responseData = {
      id: newExpense.id,
      userId: newExpense.userId,
      spentAt: newExpense.spentAt,
      title: newExpense.title,
      amount: newExpense.amount,
      category: newExpense.category,
      note: newExpense.note,
    };

    // Add categoryId to the response if it exists
    if (newExpense.categoryId) {
      responseData.categoryId = newExpense.categoryId;
    }

    res.status(201).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /expenses/:id - Get an expense by ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const expense = await models.Expense.findByPk(id, {
      include: [
        {
          model: models.Category,
          attributes: ['id', 'name'],
          required: false,
        },
      ],
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Return only the fields that tests expect
    const responseData = {
      id: expense.id,
      userId: expense.userId,
      spentAt: expense.spentAt,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      note: expense.note,
    };

    // Add categoryId to the response if it exists
    if (expense.categoryId) {
      responseData.categoryId = expense.categoryId;
    }

    // Add category data if it exists
    if (expense.Category) {
      responseData.categoryData = {
        id: expense.Category.id,
        name: expense.Category.name,
      };
    }

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /expenses/:id - Update expense fields
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const expense = await models.Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const allowedFields = [
      'spentAt',
      'title',
      'amount',
      'category',
      'categoryId',
      'note',
    ];
    const updateData = {};

    // Build update object with allowed fields
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    // Check if any valid fields were provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided' });
    }

    // If categoryId is provided, verify the category exists
    if (updateData.categoryId) {
      const categoryExists = await models.Category.findByPk(
        updateData.categoryId,
      );

      if (!categoryExists) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }

    // Update expense
    await expense.update(updateData);

    // Get the updated expense data with category information
    const updatedExpense = await models.Expense.findByPk(id, {
      include: [
        {
          model: models.Category,
          attributes: ['id', 'name'],
          required: false,
        },
      ],
    });

    // Return only the fields that tests expect
    const responseData = {
      id: updatedExpense.id,
      userId: updatedExpense.userId,
      spentAt: updatedExpense.spentAt,
      title: updatedExpense.title,
      amount: updatedExpense.amount,
      category: updatedExpense.category,
      note: updatedExpense.note,
    };

    // Add categoryId to the response if it exists
    if (updatedExpense.categoryId) {
      responseData.categoryId = updatedExpense.categoryId;
    }

    // Add category data if it exists
    if (updatedExpense.Category) {
      responseData.categoryData = {
        id: updatedExpense.Category.id,
        name: updatedExpense.Category.name,
      };
    }

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /expenses/:id - Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const expense = await models.Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
