const expenseService = require('./expenses.service.js');

exports.getExpenses = async (req, res) => {
  const expenses = await expenseService.getAll(req.query);

  res.status(200).json(expenses);
};

exports.getExpense = async (req, res) => {
  const expense = await expenseService.getById(Number(req.params.id));

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.status(200).json(expense);
};

exports.createExpense = async (req, res) => {
  const { userId, amount, spentAt, title, category, note } = req.body;

  if (!title || !userId || !title.trim() || amount === undefined || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create({
    userId,
    amount,
    spentAt,
    title,
    category,
    note,
  });

  if (!expense) {
    res.status(400).json({ error: 'Invalid expense data' });

    return;
  }

  res.status(201).json(expense);
};

exports.updateExpense = async (req, res) => {
  const expense = await expenseService.getById(Number(req.params.id));
  const changes = req.body;

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.status(200).json(await expenseService.update(expense.id, changes));
};

exports.removeExpense = async (req, res) => {
  const deleted = await expenseService.remove(Number(req.params.id));

  if (!deleted) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.sendStatus(204);
};
