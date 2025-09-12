const express = require('express');
const { Expense, Income, initDB } = require('./models/models');

const createServer = async () => {
  await initDB();

  const app = express();
  app.use(express.json());

  // Expense endpoints
  app.get('/expenses', async (req, res) => {
    const expenses = await Expense.findAll();
    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { description, amount } = req.body;
    if (!description || amount === undefined) {
      return res.status(400).json({ error: 'Invalid expense data' });
    }
    const expense = await Expense.create({ description, amount });
    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  });

  app.put('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    const { description, amount } = req.body;
    if (!description || amount === undefined) {
      return res.status(400).json({ error: 'Invalid expense data' });
    }

    expense.description = description;
    expense.amount = amount;
    await expense.save();
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    await expense.destroy();
    res.status(204).send();
  });

  // Income endpoints
  app.get('/incomes', async (req, res) => {
    const incomes = await Income.findAll();
    res.json(incomes);
  });

  app.post('/incomes', async (req, res) => {
    const { source, amount } = req.body;
    if (!source || amount === undefined) {
      return res.status(400).json({ error: 'Invalid income data' });
    }
    const income = await Income.create({ source, amount });
    res.status(201).json(income);
  });

  app.get('/incomes/:id', async (req, res) => {
    const income = await Income.findByPk(req.params.id);
    if (!income) return res.status(404).json({ error: 'Income not found' });
    res.json(income);
  });

  app.put('/incomes/:id', async (req, res) => {
    const income = await Income.findByPk(req.params.id);
    if (!income) return res.status(404).json({ error: 'Income not found' });

    const { source, amount } = req.body;
    if (!source || amount === undefined) {
      return res.status(400).json({ error: 'Invalid income data' });
    }

    income.source = source;
    income.amount = amount;
    await income.save();
    res.json(income);
  });

  app.delete('/incomes/:id', async (req, res) => {
    const income = await Income.findByPk(req.params.id);
    if (!income) return res.status(404).json({ error: 'Income not found' });
    await income.destroy();
    res.status(204).send();
  });

  return app;
};

module.exports = createServer;
