/* eslint-disable no-console */
// src/services/expenses.service.js
const express = require('express');
const router = express.Router();
const { models } = require('../models/models');
const { Op } = require('sequelize');

const Expense = models.Expense;
const User = models.User;

const { getUserById } = require('./users.service');

router.get('/', async (req, res) => {
  const { userId, from, to, categories, category } = req.query;
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  } else if (from) {
    whereClause.spentAt = {
      [Op.gte]: new Date(from),
    };
  } else if (to) {
    whereClause.spentAt = {
      [Op.lte]: new Date(to),
    };
  }

  if (category) {
    whereClause.category = category;
  } else if (categories) {
    const categoryArray = categories.split(',');

    whereClause.category = {
      [Op.in]: categoryArray,
    };
  }

  try {
    const expenses = await Expense.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExists = await getUserById(userId);

  if (!title || !userExists) {
    return res
      .status(400)
      .json({ error: 'Title is required and user must exist' });
  }

  try {
    const newExpense = await Expense.create({
      userId,
      spentAt: new Date(spentAt),
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error fetching expense by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  try {
    const [updatedRowsCount, updatedExpenses] = await Expense.update(
      {
        ...(spentAt !== undefined && { spentAt: new Date(spentAt) }),
        ...(title !== undefined && { title }),
        ...(amount !== undefined && { amount }),
        ...(category !== undefined && { category }),
        ...(note !== undefined && { note }),
      },
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(updatedExpenses[0]);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Expense.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = { router };
