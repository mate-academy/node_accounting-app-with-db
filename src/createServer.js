const express = require('express');
const { User, Expense, sequelize } = require('./models/models');

// Funkcja inicjalizacji bazy
const initDB = async () => {
  await sequelize.sync({ force: true });

  // przykładowi użytkownicy do testów
  await User.bulkCreate([
    { name: 'Alice' },
    { name: 'Bob' },
  ]);
};

function createServer() {
  const app = express();
  app.use(express.json());

  // inicjalizacja bazy
  initDB();

  // ENDPOINTY USERS
  app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const user = await User.create({ name });
    res.status(201).json(user);
  });

  app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).end();
  });

  // ENDPOINTY EXPENSES
  app.get('/expenses', async (req, res) => {
    const expenses = await Expense.findAll();
    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;
    if (!userId || !title || amount === undefined || !category || !spentAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const expense = await Expense.create({ userId, title, amount, category, note, spentAt });
    res.status(201).json(expense);
  });

  app.put('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    await expense.update(req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    await expense.destroy();
    res.status(204).end();
  });

  return app;
}

module.exports = createServer;
