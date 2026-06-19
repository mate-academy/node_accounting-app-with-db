/* eslint-disable no-console */
const expenseService = require('../services/Expense.service');
const userService = require('../services/User.service');

async function get(req, res) {
  try {
    let allExpenses = await expenseService.getAllExpenses();
    const { userId, from, to, categories } = req.query;

    if (userId) {
      const uid = +userId;

      if (isNaN(uid)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      const user = await userService.getUserById(uid);

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      allExpenses = allExpenses.filter((exp) => exp.userId === uid);
    }

    if (categories) {
      const catList = categories.split(',');

      allExpenses = allExpenses.filter((exp) => catList.includes(exp.category));
    }

    if (from || to) {
      const fromDate =
        from && !isNaN(Date.parse(from)) ? new Date(from) : new Date(0);
      const toDate = to && !isNaN(Date.parse(to)) ? new Date(to) : new Date();

      allExpenses = allExpenses.filter((exp) => {
        const spentAt = new Date(exp.spentAt);

        return spentAt >= fromDate && spentAt <= toDate;
      });
    }
    res.status(200).json(allExpenses);
  } catch (err) {
    console.error('Failed to get expenses', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOne(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (err) {
    console.error('Failed to get expense', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const uid = +userId;

  if (isNaN(uid)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const user = await userService.getUserById(uid);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (isNaN(Date.parse(spentAt))) {
      return res.status(400).json({ message: 'Invalid spentAt format' });
    }

    if (typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid title' });
    }

    if (typeof amount !== 'number') {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (category !== undefined && typeof category !== 'string') {
      return res.status(400).json({ message: 'Invalid category' });
    }

    if (note !== undefined && typeof note !== 'string') {
      return res.status(400).json({ message: 'Invalid note' });
    }

    const expense = await expenseService.createExpense({
      userId: uid,
      spentAt: new Date(spentAt).toISOString(),
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error('Failed to create expense', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function remove(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expenseService.deleteExpense(id);
    res.status(204).end();
  } catch (err) {
    console.error('Failed to remove expense', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function update(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const body = req.body;

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (body.userId && !(await userService.getUserById(body.userId))) {
      return res.status(404).json({ message: 'User not found' });
    }

    if ('title' in body && typeof body.title !== 'string') {
      return res.status(400).json({ message: 'Invalid title format' });
    }

    if ('amount' in body && typeof body.amount !== 'number') {
      return res.status(400).json({ message: 'Invalid amount format' });
    }

    if ('category' in body && typeof body.category !== 'string') {
      return res.status(400).json({ message: 'Invalid category format' });
    }

    if ('spentAt' in body && isNaN(Date.parse(body.spentAt))) {
      return res.status(400).json({ message: 'Invalid spentAt format' });
    }

    if (body.note !== undefined && typeof body.note !== 'string') {
      return res.status(400).json({ message: 'Invalid note format' });
    }

    const updatedExpense = await expenseService.updateExpense(id, body);

    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error('Failed to update expense', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
