// const express = require('express');
// const userController = require('./users.repository.mjs');
// const expensesController = require('./expenses.repository.js');
import express from 'express';
import expensesController from './expenses.repository.mjs';
import usersController from './users.repository.mjs';

const router = express.Router();

const keys = ['spentAt', 'title', 'amount', 'category', 'note'];

router.get('/', async (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      const userId = req.query['userId']?.trim() || null;
      const category = req.query['category']?.trim() || null;
      const from = req.query['from'] || null;
      const to = req.query['to'] || null;

      if ((from && !to) || (to && !from)) {
        res.statusCode = 400;
        res.end();

        return;
      }

      const expenses = await expensesController.getByParams({
        userId,
        category,
        spentAt: {
          from,
          to,
        },
      });

      res.statusCode = 200;
      res.send(expenses);

      return;
    }

    res.statusCode = 200;
    res.send(await expensesController.getAll());
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const target = await expensesController.getById(id);

    if (!target) {
      res.statusCode = 404;
      res.end();

      return;
    }

    res.statusCode = 200;
    res.send(target);
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

router.post('/', express.json(), async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      typeof userId !== 'string' ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      typeof amount !== 'number' ||
      typeof category !== 'string'
    ) {
      res.statusCode = 400;

      res.end();

      return;
    }

    if (!(await usersController.getById(userId))) {
      res.statusCode = 404;
      res.end();

      return;
    }

    const expense = await expensesController.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.statusCode = 201;
    res.send(expense);
  } catch (error) {
    // console.log(error);
    res.statusCode = 500;
    res.end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteStatus = await expensesController.deleteExpense(id);

    if (!deleteStatus) {
      res.statusCode = 404;
      res.end();

      return;
    }

    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

router.patch('/:id', express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const toUpdate = req.body;

    for (const key of Object.keys(toUpdate)) {
      if (!keys.includes(key)) {
        res.statusCode = 400;
        res.end();

        return;
      }
    }

    const expense = await expensesController.update(id, toUpdate);

    if (!expense) {
      res.statusCode = 404;
      res.end();

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

export { router };
