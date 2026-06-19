'use strict';

const { Router } = require('express');

function createExpensesRouter(expensesService, usersService) {
  const expensesRouter = Router();

  expensesRouter.get('/', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const expenses = await expensesService.getAll({
      userId,
      from,
      to,
      categories,
    });

    res.json(expenses);
  });

  expensesRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const expense = await expensesService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  expensesRouter.post('/', async (req, res) => {
    const { userId, spentAt, title, amount, categoryId, note } = req.body;

    if (userId === undefined || !spentAt || !title || amount === undefined) {
      return res.sendStatus(400);
    }

    const user = await usersService.getById(Number(userId));

    if (!user) {
      return res.sendStatus(400);
    }

    const newExpense = await expensesService.create({
      userId: Number(userId),
      spentAt,
      title,
      amount: Number(amount),
      categoryId: categoryId !== undefined ? Number(categoryId) : null,
      note,
    });

    res.status(201).json(newExpense);
  });

  expensesRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const expense = await expensesService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expensesService.deleteById(id);

    res.sendStatus(204);
  });

  expensesRouter.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const existingExpense = await expensesService.getById(id);

    if (!existingExpense) {
      return res.sendStatus(404);
    }

    const updatedExpense = await expensesService.update(id, req.body);

    res.json(updatedExpense);
  });

  return expensesRouter;
}

module.exports = {
  createExpensesRouter,
};
