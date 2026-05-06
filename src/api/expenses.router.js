const { Router } = require('express');
const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const expensesRouter = Router();

expensesRouter.get('/', async (req, res) => {
  let expenses = await expensesService.getAll();
  const { userId, categories, from, to } = req.query;

  if (userId && Number.isNaN(+userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  if (userId) {
    expenses = expenses.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    const cat =
      categories
        .toString()
        .split(',')
        .map((item) => item.trim()) || '';

    if (cat) {
      for (const value of cat) {
        expenses = expenses.filter((exp) => exp.category.includes(value));
      }
    }
  }

  if (from) {
    expenses = expenses.filter(
      (exp) => new Date(exp.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter((exp) => new Date(exp.spentAt) <= new Date(to));
  }
  res.status(200).json([...expenses]);
});

expensesRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const [exp] = await expensesService.get('id', id);

  if (!exp) {
    return res.sendStatus(404);
  }

  res.status(200).json(exp);
});

expensesRouter.post('/', async (req, res) => {
  const body = req.body;
  const { title } = { ...body };
  const user = await usersService.get(req.body.userId);

  if (!body || !title || !user) {
    return res.sendStatus(400);
  }

  const exp = await expensesService.add(body);

  res.status(201).json(exp);
});

expensesRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  if (Number.isNaN(id)) {
    return res.sendStatus(400);
  }

  const exp = await expensesService.update(id, body);

  if (!exp) {
    return res.sendStatus(404);
  }

  res.status(200).json(exp);
});

expensesRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const exp = await expensesService.remove(id);

  if (!exp) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

module.exports = expensesRouter;
