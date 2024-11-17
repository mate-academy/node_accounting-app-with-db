const { Router } = require('express');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const expensesRouter = Router();

expensesRouter.get('/', async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses);
});

expensesRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
});

expensesRouter.post('/', async (req, res) => {
  if (!usersService.getById(Number(req.body.userId))) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(req.body);

  res.status(201).send(expense);
});

expensesRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(id);

  res.sendStatus(204);
});

expensesRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update(id, req.body);

  res.json(updatedExpense);
});

module.exports = {
  expensesRouter,
};
