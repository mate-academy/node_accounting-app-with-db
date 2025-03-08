'use strict';

function createServer() {
  const app = express();
  app.use(express.json());

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Name is required');
    }

    try {
      const user = await User.create({ name });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send('Error creating user');
    }
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (error) {
      res.status(500).send('Error fetching user');
    }
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send('User not found');
      }

      user.name = name || user.name;
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send('User not found');
      }

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send('Error deleting user');
    }
  });

  app.get('/expenses', async (req, res) => {
    try {
      const expenses = await Expense.findAll();
      res.json(expenses);
    } catch (error) {
      res.status(500).send('Error fetching expenses');
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) return res.status(400).send('User ID is required');
    if (!spentAt) return res.status(400).send('SpentAt date is required');
    if (!title) return res.status(400).send('Title is required');
    if (!amount || amount <= 0) return res.status(400).send('Amount must be greater than zero');
    if (!category) return res.status(400).send('Category is required');

    try {
      const userExists = await User.findByPk(userId);
      if (!userExists) {
        return res.status(400).send('User not found');
      }

      const expense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).send('Error creating expense');
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        return res.status(404).send('Expense not found');
      }
      res.json(expense);
    } catch (error) {
      res.status(500).send('Error fetching expense');
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        return res.status(404).send('Expense not found');
      }

      expense.spentAt = spentAt || expense.spentAt;
      expense.title = title || expense.title;
      expense.amount = amount || expense.amount;
      expense.category = category || expense.category;
      expense.note = note || expense.note;
      await expense.save();
      res.json(expense);
    } catch (error) {
      res.status(500).send('Error updating expense');
    }
  });

  // Delete an expense
  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        return res.status(404).send('Expense not found');
      }

      await expense.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send('Error deleting expense');
    }
  });

  return app;
};

module.exports = {
  createServer,
};
